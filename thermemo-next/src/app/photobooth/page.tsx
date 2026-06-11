"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Camera,
  Copy,
  Download,
  Instagram,
  RefreshCcw,
  RotateCcw,
  Share2,
  Timer,
  Upload,
} from "lucide-react";
import { FRAME_STYLES } from "@/lib/data";
import { FRAME_TEMPLATES, getTemplateById } from "@/lib/frames";
import { getFilterCss } from "@/lib/filters";
import { trackEvent } from "@/lib/analytics";
import { saveBoothState, loadBoothState, clearBoothState } from "@/lib/booth-storage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ReceiptRenderer } from "@/components/photobooth/receipt-renderer";
import { StampLayer, type StampPlacement } from "@/components/photobooth/stamp-layer";
import { FilterSelector } from "@/components/photobooth/filter-selector";
import { TabbedLayoutPicker } from "@/components/photobooth/tabbed-layout-picker";

type Step = 1 | 2 | 3 | 4;

interface BoothState {
  templateId: string;
  frameStyleId: string;
  filterId: string;
  photos: (string | null)[];
  caption: string;
  showDate: boolean;
  showNum: boolean;
  square: boolean;
  timer: boolean;
  facingMode: string;
  date: string;
  time: string;
  session: string;
  stamps: StampPlacement[];
}

const INITIAL_STATE: BoothState = {
  templateId: "",
  frameStyleId: "",
  filterId: "thermal",
  photos: [],
  caption: "",
  showDate: true,
  showNum: true,
  square: false,
  timer: false,
  facingMode: "user",
  date: "",
  time: "",
  session: "",
  stamps: [],
};

const RECEIPT_WIDTH = 320;

export default function Photobooth() {
  const [step, setStep] = useState<Step>(1);
  const [booth, setBooth] = useState<BoothState>(INITIAL_STATE);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashing, setFlashing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [captureError, setCaptureError] = useState("");
  const [downloadReady, setDownloadReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const template = getTemplateById(booth.templateId) ?? FRAME_TEMPLATES[3];
  const frameStyle =
    FRAME_STYLES.find((f) => f.id === booth.frameStyleId) ?? FRAME_STYLES[0];
  const filterCss = getFilterCss(booth.filterId);
  const photoCount = template.photoCount;

  useEffect(() => {
    const saved = loadBoothState();
    if (saved.selectedFrameId) {
      setBooth((b) => ({
        ...b,
        frameStyleId: saved.selectedFrameId ?? b.frameStyleId,
        filterId: saved.selectedFilter ?? b.filterId,
        caption: saved.caption ?? b.caption,
        showDate: saved.showDate ?? b.showDate,
        showNum: saved.showNum ?? b.showNum,
        square: saved.square ?? b.square,
      }));
    }
  }, []);

  useEffect(() => {
    saveBoothState({
      selectedFrameId: booth.frameStyleId,
      selectedFilter: booth.filterId,
      caption: booth.caption,
      showDate: booth.showDate,
      showNum: booth.showNum,
      square: booth.square,
    });
  }, [booth.frameStyleId, booth.filterId, booth.caption, booth.showDate, booth.showNum, booth.square]);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(
    async (facingMode: string) => {
      stopStream();
      setCameraReady(false);
      setCameraError(false);
      setCaptureError("");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 960 },
          },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.display = "block";
          await videoRef.current.play().catch(() => undefined);
          if (videoRef.current.videoWidth > 0) setCameraReady(true);
        }
      } catch {
        setCameraError(true);
        setCameraReady(false);
      }
    },
    [stopStream],
  );

  useEffect(() => {
    if (step === 2) {
      startCamera(booth.facingMode);
    }
    return () => {
      if (step !== 2) stopStream();
    };
  }, [step, booth.facingMode, startCamera, stopStream]);

  function stampMeta() {
    const now = new Date();
    const d = now.toLocaleDateString("en-GB").replace(/\//g, ".");
    const t = now.toTimeString().slice(0, 5);
    const session = String(Math.floor(1000 + Math.random() * 9000));
    setBooth((b) => ({ ...b, date: d, time: t, session }));
  }

  function goStep(n: Step) {
    if (n === 3) stampMeta();
    setStep(n);
    trackEvent("photobooth_step_view", { step: n });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function waitForVideoReady() {
    const video = videoRef.current;
    if (!video) return false;
    if (video.videoWidth > 0 && video.videoHeight > 0) return true;
    await new Promise<void>((resolve) => {
      const timeout = window.setTimeout(resolve, 1200);
      video.onloadedmetadata = () => {
        window.clearTimeout(timeout);
        resolve();
      };
    });
    await video.play().catch(() => undefined);
    return video.videoWidth > 0 && video.videoHeight > 0;
  }

  async function grabFrame(): Promise<string | null> {
    const video = videoRef.current;
    const ready = await waitForVideoReady();
    if (!video || !ready) return null;
    const cv = document.createElement("canvas");
    cv.width = video.videoWidth;
    cv.height = video.videoHeight;
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(video, 0, 0, cv.width, cv.height);
    return cv.toDataURL("image/jpeg", 0.92);
  }

  function flashShutter() {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
  }

  async function onCapture() {
    setCaptureError("");
    const photos = [...booth.photos];
    const nextEmpty = photos.findIndex((p, i) => i < photoCount && !p);
    if (nextEmpty === -1) return;

    if (booth.timer) {
      await new Promise<void>((res) => {
        let n = 3;
        setCountdown(n);
        const tick = setInterval(() => {
          n -= 1;
          if (n <= 0) {
            clearInterval(tick);
            setCountdown(null);
            res();
          } else {
            setCountdown(n);
          }
        }, 700);
      });
    }

    flashShutter();
    const data = await grabFrame();
    if (data) {
      photos[nextEmpty] = data;
      setBooth((b) => ({ ...b, photos }));
      trackEvent("capture_photo", {
        template: booth.templateId,
        frame: booth.frameStyleId,
        slot: nextEmpty + 1,
      });
    } else {
      setCaptureError("Camera belum siap. Tunggu preview muncul, lalu coba lagi.");
    }
  }

  function retakePhoto(idx: number) {
    const photos = [...booth.photos];
    photos[idx] = null;
    setBooth((b) => ({ ...b, photos }));
  }

  function flipCamera() {
    const newMode = booth.facingMode === "user" ? "environment" : "user";
    setBooth((b) => ({ ...b, facingMode: newMode }));
    trackEvent("flip_camera", { facingMode: newMode });
    startCamera(newMode);
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, photoCount);
    files.forEach((file) => {
      const fr = new FileReader();
      fr.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const cv = document.createElement("canvas");
          cv.width = img.naturalWidth;
          cv.height = img.naturalHeight;
          const ctx = cv.getContext("2d");
          if (!ctx) return;
          ctx.drawImage(img, 0, 0);
          const data = cv.toDataURL("image/jpeg", 0.92);
          setBooth((b) => {
            const photos = [...b.photos];
            const slot = photos.findIndex((p, i) => i < photoCount && !p);
            if (slot !== -1) photos[slot] = data;
            trackEvent("upload_photo", { slot: slot + 1 });
            return { ...b, photos };
          });
        };
        img.src = ev.target?.result as string;
      };
      fr.readAsDataURL(file);
    });
  }

  async function downloadReceipt() {
    setIsDownloading(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const el = document.getElementById("finalReceipt");
      if (!el) return;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `thermemo_${booth.date.replace(/\./g, "")}_${booth.session}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setDownloadReady(true);
      trackEvent("download_receipt", {
        template: booth.templateId,
        frame: booth.frameStyleId,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsDownloading(false);
    }
  }

  async function shareReceipt() {
    try {
      const { default: html2canvas } = await import("html2canvas");
      const el = document.getElementById("finalReceipt");
      if (!el) return;
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "thermemo-receipt.png", {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "thermemo receipt",
            text: "proof that this moment happened. @thermemo.id #thermemo",
          });
          trackEvent("share_receipt");
        } else {
          await downloadReceipt();
          trackEvent("share_fallback_download");
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function copySocialTag() {
    const tag = "@thermemo.id #thermemo";
    await navigator.clipboard?.writeText(tag);
    trackEvent("copy_instagram_tag");
  }

  function resetBooth() {
    stopStream();
    clearBoothState();
    setBooth(INITIAL_STATE);
    setDownloadReady(false);
    setStep(1);
  }

  const filledCount = booth.photos.filter(Boolean).length;
  const allFilled = photoCount > 0 && filledCount >= photoCount;
  const stepLabels = ["Choose", "Capture", "Customize", "Download"];

  return (
    <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-32 pb-20">
      <div className="flex items-center justify-center mb-12">
        {([1, 2, 3, 4] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase"
              style={{
                color:
                  s === step ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              <span
                className="w-7 h-7 flex items-center justify-center text-[11px] rounded-full border transition-all duration-300"
                style={{
                  background:
                    s < step
                      ? "#111111"
                      : s === step
                        ? "#553125"
                        : "var(--background)",
                  color: s <= step ? "#F7F4EE" : "#111111",
                  borderColor:
                    s < step
                      ? "#111111"
                      : s === step
                        ? "#553125"
                        : "var(--border)",
                }}
              >
                {s < step ? "✓" : String(s)}
              </span>
              <span className="hidden md:inline">{stepLabels[i]}</span>
            </div>
            {i < 3 && (
              <span
                className="w-7 md:w-14 h-px mx-1"
                style={{ background: "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Pick your receipt layout
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-8 tracking-[0.05em]">
            choose how many moments this receipt will keep
          </p>

          <TabbedLayoutPicker
            selected={booth.templateId}
            onSelect={(t) => {
              setBooth((b) => ({
                ...b,
                templateId: t.id,
                photos: Array(t.photoCount).fill(null),
              }));
              trackEvent("select_template", { template: t.id, photos: t.photoCount });
            }}
          />

          {booth.templateId && (
            <div className="mt-10">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-4">
                receipt style
              </p>
              <div
                className="flex gap-3 overflow-x-auto pb-4"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {FRAME_STYLES.map((F) => {
                  const isDark =
                    F.cls === "dark" || F.cls === "ghost";
                  const fgStyle: React.CSSProperties = isDark
                    ? {
                        background: "#111",
                        color: "rgba(220,216,209,0.5)",
                        border: "1px solid #111",
                      }
                    : F.cls === "paper"
                      ? { background: "#EFEADF", border: "1px solid #DCD8D1" }
                      : F.cls === "archive"
                        ? { background: "#e8e3d8", border: "1px solid #DCD8D1" }
                        : F.cls === "cedar"
                          ? { border: "1.5px solid #553125" }
                          : { border: "1px solid var(--border)" };
                  return (
                    <button
                      key={F.id}
                      onClick={() => {
                        setBooth((b) => ({ ...b, frameStyleId: F.id }));
                        trackEvent("select_frame", { frame: F.id });
                      }}
                      className="flex-shrink-0 w-[140px] p-1 transition-all duration-200"
                      style={{
                        border:
                          booth.frameStyleId === F.id
                            ? "1.5px solid #553125"
                            : "1.5px solid transparent",
                        scrollSnapAlign: "start",
                        borderRadius: 2,
                      }}
                    >
                      <div
                        className="flex flex-col gap-[4px] p-[10px] relative text-[7px] tracking-[0.2em] uppercase"
                        style={{ ...fgStyle, aspectRatio: "3/4" }}
                      >
                        <div className="flex justify-between">
                          <span>thermemo</span>
                          <span>·</span>
                        </div>
                        <div
                          className="flex-1"
                          style={{
                            background: isDark
                              ? "#2a2622"
                              : "var(--muted-foreground)",
                          }}
                        />
                        <div className="flex justify-between">
                          <span>NO.0042</span>
                          <span>記</span>
                        </div>
                      </div>
                      <div className="pt-2 pb-1 px-1 text-[10px] font-bold tracking-[0.15em] uppercase">
                        {F.name}
                      </div>
                      <div className="pb-1.5 px-1 text-[8px] text-muted-foreground tracking-[0.1em]">
                        {F.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end mt-12 pt-6 border-t border-border">
            <Button
              onClick={() => goStep(2)}
              disabled={!booth.templateId || !booth.frameStyleId}
            >
              Open camera →
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Take your photo{photoCount > 1 ? "s" : ""}
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-10 tracking-[0.05em]">
            {filledCount} / {photoCount} frames captured · your camera stays local
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-10">
            <div>
              <div
                className="relative overflow-hidden border border-border"
                style={{ aspectRatio: "3/4", background: "#111111" }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  onLoadedMetadata={() => setCameraReady(true)}
                  onCanPlay={() => setCameraReady(true)}
                  className="w-full h-full object-cover"
                  style={{ filter: filterCss }}
                />
                {!cameraReady && !cameraError && (
                  <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center gap-4 p-6 text-center text-[12px] tracking-[0.2em] text-muted-foreground">
                    <span
                      style={{
                        fontFamily: "var(--font-jp)",
                        fontSize: "24px",
                        color: "#9a7c6e",
                      }}
                    >
                      記
                    </span>
                    <span>Starting camera...</span>
                  </div>
                )}
                {cameraError && (
                  <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center gap-4 p-6 text-center text-[12px] tracking-[0.2em] text-muted-foreground">
                    <span
                      style={{
                        fontFamily: "var(--font-jp)",
                        fontSize: "24px",
                        color: "#9a7c6e",
                      }}
                    >
                      記
                    </span>
                    <span>Camera not active</span>
                  </div>
                )}
                {["tl", "tr", "bl", "br"].map((c) => (
                  <div
                    key={c}
                    className="absolute w-[18px] h-[18px] z-10"
                    style={{
                      top: c.includes("t") ? "10px" : undefined,
                      bottom: c.includes("b") ? "10px" : undefined,
                      left: c.includes("l") ? "10px" : undefined,
                      right: c.includes("r") ? "10px" : undefined,
                      borderTop: c.includes("t")
                        ? "1px solid rgba(220,216,209,0.7)"
                        : "none",
                      borderBottom: c.includes("b")
                        ? "1px solid rgba(220,216,209,0.7)"
                        : "none",
                      borderLeft: c.includes("l")
                        ? "1px solid rgba(220,216,209,0.7)"
                        : "none",
                      borderRight: c.includes("r")
                        ? "1px solid rgba(220,216,209,0.7)"
                        : "none",
                    }}
                  />
                ))}
                {countdown !== null && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-20 font-bold"
                    style={{
                      background: "rgba(0,0,0,0.45)",
                      fontSize: "144px",
                      color: "#fff",
                      fontFamily: "var(--font-display)",
                      lineHeight: "1",
                    }}
                  >
                    {countdown}
                  </div>
                )}
                {flashing && (
                  <div className="absolute inset-0 bg-white z-30 opacity-80" />
                )}
              </div>

              <div className="flex gap-[10px] mt-4 flex-wrap">
                <Button
                  onClick={onCapture}
                  disabled={allFilled || !cameraReady || cameraError}
                >
                  <Camera className="size-4" /> Take photo
                </Button>
                <Button variant="outline" onClick={flipCamera}>
                  <RotateCcw className="size-4" /> Flip
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setBooth((b) => ({ ...b, timer: !b.timer }))}
                  style={
                    booth.timer
                      ? { borderColor: "#553125", color: "#553125" }
                      : {}
                  }
                >
                  <Timer className="size-4" /> 3s timer
                </Button>
                <label className="inline-flex h-9 items-center justify-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-all hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  <Upload className="size-4" /> Upload
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onUpload}
                  />
                </label>
              </div>

              {captureError && (
                <p className="mt-3 text-sm leading-6 text-primary">
                  {captureError}
                </p>
              )}

              {cameraError && (
                <div className="mt-4 p-5 border border-primary bg-card text-sm leading-[1.7]">
                  <strong className="block mb-[6px]">
                    Camera permission needed
                  </strong>
                  <span>
                    izinkan akses kamera di pengaturan browser, atau upload foto
                    kamu langsung:
                  </span>
                  <label className="inline-block mt-3 px-4 py-[10px] border border-primary text-[10px] tracking-[0.22em] uppercase text-primary font-semibold cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                    Upload photos
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={onUpload}
                    />
                  </label>
                </div>
              )}

              <div className="mt-6">
                <FilterSelector
                  selected={booth.filterId}
                  onSelect={(id) => {
                    setBooth((b) => ({ ...b, filterId: id }));
                    trackEvent("select_filter", { filter: id });
                  }}
                  previewImage={booth.photos.find(Boolean) ?? null}
                />
              </div>
            </div>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground mb-4">
                your strip
              </div>
              <div className="flex flex-col gap-[10px]">
                {Array.from({ length: photoCount }).map((_, i) => {
                  const p = booth.photos[i];
                  return p ? (
                    <div
                      key={i}
                      className="relative overflow-hidden border border-border"
                      style={{ aspectRatio: "3/4" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p}
                        alt={`slot ${i + 1}`}
                        className="w-full h-full object-cover"
                        style={{ filter: filterCss }}
                      />
                      <button
                        onClick={() => retakePhoto(i)}
                        className="absolute top-[6px] right-[6px] w-[22px] h-[22px] flex items-center justify-center text-[12px] text-white rounded-full"
                        style={{ background: "rgba(17,17,17,0.7)" }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className="flex items-center justify-center border border-dashed border-muted-foreground text-[11px] tracking-[0.22em] text-muted-foreground"
                      style={{ aspectRatio: "3/4", background: "var(--muted)" }}
                    >
                      slot 0{i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                stopStream();
                goStep(1);
              }}
            >
              ← Back
            </Button>
            <Button onClick={() => goStep(3)} disabled={!allFilled}>
              Customize →
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Customize your receipt
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-10 tracking-[0.05em]">
            add stamps, write a caption, make it yours
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex justify-center">
              <div className="relative">
                <ReceiptRenderer
                  id="previewReceipt"
                  template={template}
                  frameStyle={frameStyle}
                  photos={booth.photos}
                  filterCss={filterCss}
                  stamps={booth.stamps}
                  caption={booth.caption}
                  showDate={booth.showDate}
                  showNum={booth.showNum}
                  square={booth.square}
                  date={booth.date}
                  time={booth.time}
                  session={booth.session}
                  width={RECEIPT_WIDTH}
                />
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="flex flex-col gap-6 p-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-2">
                      Caption · max 24 chars
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      placeholder="a small moment."
                      value={booth.caption}
                      onChange={(e) =>
                        setBooth((b) => ({ ...b, caption: e.target.value }))
                      }
                      className="w-full pb-[10px] text-[14px] bg-transparent transition-colors duration-200 outline-none"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    />
                  </div>

                  {[
                    {
                      key: "showDate" as const,
                      label: "Date display",
                      text: "Show date on receipt",
                    },
                    {
                      key: "showNum" as const,
                      label: "Receipt number",
                      text: "Show session number",
                    },
                    {
                      key: "square" as const,
                      label: "Strip orientation",
                      text: "Square crop (default vertical)",
                    },
                  ].map((t) => (
                    <div key={t.key}>
                      <label className="block text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-2">
                        {t.label}
                      </label>
                      <button
                        className="flex items-center gap-3 text-[13px]"
                        onClick={() =>
                          setBooth((b) => ({ ...b, [t.key]: !b[t.key] }))
                        }
                      >
                        <span
                          className="w-9 h-5 relative cursor-pointer transition-colors duration-300"
                          style={{
                            borderRadius: "10px",
                            border: `1px solid ${booth[t.key] ? "#553125" : "var(--muted-foreground)"}`,
                            background: booth[t.key]
                              ? "#553125"
                              : "transparent",
                          }}
                        >
                          <span
                            className="absolute top-[2px] w-[14px] h-[14px] rounded-full transition-all duration-300"
                            style={{
                              left: booth[t.key] ? "18px" : "2px",
                              background: booth[t.key]
                                ? "#fff"
                                : "var(--muted-foreground)",
                            }}
                          />
                        </span>
                        <span>{t.text}</span>
                      </button>
                    </div>
                  ))}

                  <div
                    className="pt-4 mt-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "var(--muted-foreground)",
                      borderTop: "1px dashed var(--border)",
                    }}
                  >
                    {[
                      ["DATE", booth.date || "—"],
                      ["TIME", booth.time || "—"],
                      [
                        "SESSION",
                        booth.session
                          ? `MEM-${booth.date.replace(/\./g, "")}-${booth.session}`
                          : "—",
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between py-1">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <StampLayer
                    stamps={booth.stamps}
                    onChange={(stamps) => setBooth((b) => ({ ...b, stamps }))}
                    receiptWidth={RECEIPT_WIDTH}
                  />
                </CardContent>
              </Card>

              <FilterSelector
                selected={booth.filterId}
                onSelect={(id) => {
                  setBooth((b) => ({ ...b, filterId: id }));
                  trackEvent("select_filter", { filter: id });
                }}
                previewImage={booth.photos.find(Boolean) ?? null}
              />
            </div>
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => goStep(2)}>
              ← Back
            </Button>
            <Button onClick={() => goStep(4)}>Download & share →</Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center">
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Your receipt is ready.
          </h2>
          <p
            className="text-2xl italic mb-10 text-center"
            style={{ fontFamily: "var(--font-accent)", color: "#553125" }}
          >
            fragment of memory, printed.
          </p>

          <div className="flex justify-center mb-8">
            <ReceiptRenderer
              id="finalReceipt"
              template={template}
              frameStyle={frameStyle}
              photos={booth.photos}
              filterCss={filterCss}
              stamps={booth.stamps}
              caption={booth.caption}
              showDate={booth.showDate}
              showNum={booth.showNum}
              square={booth.square}
              date={booth.date}
              time={booth.time}
              session={booth.session}
              width={RECEIPT_WIDTH}
            />
          </div>

          <div className="flex gap-3 justify-center flex-wrap mt-6">
            <Button onClick={downloadReceipt} disabled={isDownloading}>
              <Download className="size-4" /> {isDownloading ? "Generating..." : "Download receipt"}
            </Button>
            <Button variant="outline" onClick={shareReceipt}>
              <Share2 className="size-4" /> Share
            </Button>
            <Button variant="outline" onClick={copySocialTag}>
              <Copy className="size-4" /> Copy tag
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await downloadReceipt();
                trackEvent("open_instagram");
                window.open(
                  "https://instagram.com/thermemo.id",
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            >
              <Instagram className="size-4" /> Open Instagram
            </Button>
          </div>

          {downloadReady && (
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              receipt downloaded. tag{" "}
              <span className="font-semibold text-foreground">
                @thermemo.id #thermemo
              </span>{" "}
              to get featured on our community wall.
            </p>
          )}

          <button
            onClick={resetBooth}
            className="mt-6 px-0 py-[10px] text-[11px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200"
          >
            <RefreshCcw className="mr-1 inline size-3" /> Take another
          </button>

          <Card className="max-w-[480px] mx-auto mt-14 border-primary">
            <CardContent className="p-7 text-center">
              <h4 className="font-bold text-[16px] mb-3">
                Want a physical print?
              </h4>
              <p className="text-[13px] leading-[1.85] text-muted-foreground mb-5">
                digital is nice. paper is real. book a booth and bring it home
                in your wallet.
              </p>
              <Button asChild>
                <Link href="/booking">Book now →</Link>
              </Button>
              <div className="mt-[14px]">
                <a
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.22em] uppercase font-semibold text-primary border-b border-transparent hover:border-primary pb-[2px] transition-colors duration-200"
                >
                  Or chat us on WhatsApp →
                </a>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-start mt-12 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => goStep(3)}>
              ← Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
