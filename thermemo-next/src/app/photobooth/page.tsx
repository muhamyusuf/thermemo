"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { FRAMES, LAYOUTS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Step = 1 | 2 | 3 | 4 | 5;

interface BoothState {
  layout: number;
  frame: string;
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
}

function ReceiptPreview({ state, id }: { state: BoothState; id?: string }) {
  const frame = FRAMES.find((f) => f.id === state.frame) || FRAMES[0];
  const cls = frame.cls;

  const bgStyle: React.CSSProperties =
    cls === "dark" || cls === "ghost"
      ? { background: "#111", color: "#F7F4EE" }
      : cls === "paper"
        ? { background: "#EFEADF" }
        : cls === "archive"
          ? { background: "#e8e3d8" }
          : { background: "#fff", color: "#111111" };

  const borderStyle: React.CSSProperties =
    cls === "cedar"
      ? { border: "1.5px solid #553125" }
      : cls === "dark"
        ? { border: "1px solid #111" }
        : cls === "ghost"
          ? { border: "1.5px solid #553125", background: "#111", color: "#F7F4EE" }
          : { border: "1px solid #DCD8D1" };

  const cap = (state.caption || "a small moment.").slice(0, 24);

  return (
    <div
      id={id}
      className="relative w-[320px] px-[22px] pt-5 pb-0"
      style={{ ...bgStyle, ...borderStyle, fontFamily: "var(--font-sans)" }}
    >
      <div
        className="font-bold text-[18px] tracking-[-0.02em] lowercase text-center pb-[6px]"
        style={{ fontFamily: "var(--font-display)" }}
      >
        thermemo
      </div>
      <div
        className="text-center text-[8px] tracking-[0.3em] uppercase opacity-60 pb-[14px] mb-[14px]"
        style={{ borderBottom: "1px dashed currentColor" }}
      >
        記ノ片 · ki no kata
      </div>
      {state.showDate && (
        <div className="flex justify-between text-[8px] tracking-[0.2em] font-semibold uppercase opacity-85 pb-3">
          <span>DATE · {state.date}</span>
          <span>TIME · {state.time}</span>
        </div>
      )}
      <div className="grid gap-2 mb-3">
        {Array.from({ length: state.layout }).map((_, i) => {
          const p = state.photos[i];
          return p ? (
            <div
              key={i}
              className="overflow-hidden relative"
              style={{
                aspectRatio: state.square ? "1/1" : "3/4",
                filter: "grayscale(100%) contrast(1.05)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p}
                alt={`photo ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ) : (
            <div
              key={i}
              className="relative"
              style={{
                aspectRatio: state.square ? "1/1" : "3/4",
                background:
                  "repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,0.05) 6px 7px), #DCD8D1",
              }}
            />
          );
        })}
      </div>
      <div
        className="text-center text-[18px] italic py-[6px] pb-[10px] min-h-[28px]"
        style={{
          fontFamily: "var(--font-accent)",
          color:
            cls === "dark" || cls === "ghost" ? "#9a7c6e" : "#553125",
        }}
      >
        {cap}
      </div>
      <div className="opacity-50 my-1" style={{ borderTop: "1px dashed currentColor" }} />
      <div className="flex justify-between items-end text-[8px] tracking-[0.22em] uppercase pb-4">
        <span>{state.showNum ? `NO. ${state.session}` : ""}</span>
        <div
          className="w-9 h-9 flex items-center justify-center text-[13px]"
          style={{
            borderRadius: "50%",
            border: `1px solid ${cls === "dark" || cls === "ghost" ? "#9a7c6e" : "#553125"}`,
            color: cls === "dark" || cls === "ghost" ? "#9a7c6e" : "#553125",
            fontFamily: "var(--font-jp)",
          }}
        >
          記片
        </div>
      </div>
      <div className="text-center text-[9px] tracking-[0.3em] uppercase opacity-70 pb-4 font-medium">
        proof that this moment happened.
      </div>
      <div
        className="absolute right-[-16px] top-1/2 -translate-y-1/2 rotate-90 text-[11px] tracking-[0.15em] whitespace-nowrap"
        style={{
          fontFamily: "var(--font-jp)",
          color: cls === "dark" || cls === "ghost" ? "#9a7c6e" : "#553125",
        }}
      >
        記ノ片 · KI NO KATA
      </div>
    </div>
  );
}

export default function Photobooth() {
  const [step, setStep] = useState<Step>(1);
  const [booth, setBooth] = useState<BoothState>({
    layout: 0,
    frame: "",
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
  });
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashing, setFlashing] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(
    async (facingMode: string) => {
      stopStream();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.display = "block";
        }
        setCameraError(false);
      } catch {
        setCameraError(true);
      }
    },
    [stopStream],
  );

  useEffect(() => {
    if (step === 3) {
      startCamera(booth.facingMode);
    }
    return () => {
      if (step !== 3) stopStream();
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
    if (n === 4) stampMeta();
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function grabFrame(): string | null {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return null;
    const cv = document.createElement("canvas");
    cv.width = video.videoWidth;
    cv.height = video.videoHeight;
    const ctx = cv.getContext("2d");
    if (!ctx) return null;
    ctx.filter = "grayscale(100%) contrast(1.05)";
    ctx.drawImage(video, 0, 0);
    return cv.toDataURL("image/jpeg", 0.92);
  }

  function flashShutter() {
    setFlashing(true);
    setTimeout(() => setFlashing(false), 200);
  }

  async function onCapture() {
    const photos = [...booth.photos];
    const nextEmpty = photos.findIndex((p, i) => i < booth.layout && !p);
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
    const data = grabFrame();
    if (data) {
      photos[nextEmpty] = data;
      setBooth((b) => ({ ...b, photos }));
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
    startCamera(newMode);
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []).slice(0, booth.layout);
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
          ctx.filter = "grayscale(100%) contrast(1.05)";
          ctx.drawImage(img, 0, 0);
          const data = cv.toDataURL("image/jpeg", 0.92);
          setBooth((b) => {
            const photos = [...b.photos];
            const slot = photos.findIndex((p, i) => i < b.layout && !p);
            if (slot !== -1) photos[slot] = data;
            return { ...b, photos };
          });
        };
        img.src = ev.target?.result as string;
      };
      fr.readAsDataURL(file);
    });
  }

  async function downloadReceipt() {
    try {
      const { default: html2canvas } = await import("html2canvas");
      const el =
        document.getElementById("finalReceipt") ||
        document.getElementById("previewReceipt");
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
    } catch (e) {
      console.error(e);
    }
  }

  function resetBooth() {
    stopStream();
    setBooth({
      layout: 0,
      frame: "",
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
    });
    setStep(1);
  }

  const filledCount = booth.photos.filter(Boolean).length;
  const allFilled = booth.layout > 0 && filledCount >= booth.layout;

  const stepLabels = ["Layout", "Frame", "Capture", "Preview", "Download"];

  return (
    <div className="max-w-[1100px] mx-auto px-6 lg:px-10 pt-32 pb-20">
      {/* step indicators */}
      <div className="flex items-center justify-center mb-12">
        {([1, 2, 3, 4, 5] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase"
              style={{ color: s === step ? "var(--foreground)" : "var(--muted-foreground)" }}
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
            {i < 4 && (
              <span
                className="w-7 md:w-14 h-px mx-1"
                style={{ background: "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* STEP 1 — Layout */}
      {step === 1 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Choose your strip layout
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12 tracking-[0.05em]">
            how many frames do you want on your receipt?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {LAYOUTS.map((L) => (
              <button
                key={L.id}
                onClick={() => setBooth((b) => ({ ...b, layout: L.id }))}
                className="bg-card text-center p-[18px] transition-all duration-200"
                style={{
                  border:
                    booth.layout === L.id
                      ? "1.5px solid #553125"
                      : "1px solid var(--border)",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="flex flex-col gap-[6px] p-[10px] mb-[14px]"
                  style={{
                    background: "var(--muted)",
                    border: "1px dashed var(--muted-foreground)",
                    aspectRatio: "3/4",
                  }}
                >
                  {Array.from({ length: L.id }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 min-h-0"
                      style={{ background: "var(--border)" }}
                    />
                  ))}
                </div>
                <div className="text-[11px] tracking-[0.2em] uppercase font-semibold">
                  {L.label}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">{L.hint}</div>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-12 pt-6 border-t border-border">
            <Button onClick={() => goStep(2)} disabled={!booth.layout}>
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2 — Frame */}
      {step === 2 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Choose your frame
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12 tracking-[0.05em]">
            a design language for your memento
          </p>
          <div
            className="flex gap-4 overflow-x-auto pb-8 pt-3"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {FRAMES.map((F) => {
              const fgStyle: React.CSSProperties =
                F.cls === "dark" || F.cls === "ghost"
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
                  onClick={() => setBooth((b) => ({ ...b, frame: F.id }))}
                  className="flex-shrink-0 w-[180px] p-1 transition-all duration-200"
                  style={{
                    border:
                      booth.frame === F.id
                        ? "1.5px solid #553125"
                        : "1.5px solid transparent",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div
                    className="flex flex-col gap-[6px] p-[14px] relative text-[8px] tracking-[0.2em] uppercase"
                    style={{ ...fgStyle, aspectRatio: "3/4" }}
                  >
                    <div className="flex justify-between text-[7px]">
                      <span>thermemo</span>
                      <span>·</span>
                    </div>
                    <div
                      className="flex-1"
                      style={{
                        background:
                          F.cls === "dark" ? "#2a2622" : "var(--muted-foreground)",
                      }}
                    />
                    <div className="flex justify-between text-[7px]">
                      <span>NO.0042</span>
                      <span>記</span>
                    </div>
                  </div>
                  <div className="pt-[10px] pb-[6px] px-1 text-[11px] font-bold tracking-[0.15em] uppercase">
                    {F.name}
                  </div>
                  <div className="pb-2 px-1 text-[9px] text-muted-foreground tracking-[0.1em]">
                    {F.sub}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => goStep(1)}>
              ← Back
            </Button>
            <Button onClick={() => goStep(3)} disabled={!booth.frame}>
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3 — Camera */}
      {step === 3 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Take your photo{booth.layout > 1 ? "s" : ""}
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12 tracking-[0.05em]">
            {booth.layout} shot{booth.layout > 1 ? "s" : ""} required
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
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%) contrast(1.05)" }}
                />
                {cameraError && (
                  <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center gap-4 p-6 text-center text-[12px] tracking-[0.2em] text-muted-foreground">
                    <span
                      style={{ fontFamily: "var(--font-jp)", fontSize: "24px", color: "#9a7c6e" }}
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
                      borderTop: c.includes("t") ? "1px solid rgba(220,216,209,0.7)" : "none",
                      borderBottom: c.includes("b") ? "1px solid rgba(220,216,209,0.7)" : "none",
                      borderLeft: c.includes("l") ? "1px solid rgba(220,216,209,0.7)" : "none",
                      borderRight: c.includes("r") ? "1px solid rgba(220,216,209,0.7)" : "none",
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
                <Button onClick={onCapture} disabled={allFilled}>
                  ▢ Take photo
                </Button>
                <Button variant="outline" onClick={flipCamera}>
                  ⟲ Flip
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
                  ◷ 3s timer
                </Button>
              </div>

              {cameraError && (
                <div className="mt-4 p-5 border border-primary bg-card text-sm leading-[1.7]">
                  <strong className="block mb-[6px]">Camera permission needed</strong>
                  <span>
                    untuk pakai camera, izinkan akses di pengaturan browser. atau
                    upload foto kamu langsung:
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
            </div>

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground mb-4">
                your strip
              </div>
              <div className="flex flex-col gap-[10px]">
                {Array.from({ length: booth.layout }).map((_, i) => {
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
                        className="w-full h-full object-cover grayscale"
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
                goStep(2);
              }}
            >
              ← Back
            </Button>
            <Button onClick={() => goStep(4)} disabled={!allFilled}>
              Next →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4 — Preview */}
      {step === 4 && (
        <div>
          <h2 className="font-display font-bold text-center mb-3 text-3xl lg:text-4xl">
            Preview your receipt
          </h2>
          <p className="text-center text-sm text-muted-foreground mb-12 tracking-[0.05em]">
            customize before printing
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex justify-center">
              <div ref={previewRef}>
                <ReceiptPreview id="previewReceipt" state={booth} />
              </div>
            </div>

            <Card>
              <CardContent className="flex flex-col gap-7 p-6">
                {/* caption */}
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

                {/* toggles */}
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
                          background: booth[t.key] ? "#553125" : "transparent",
                        }}
                      >
                        <span
                          className="absolute top-[2px] w-[14px] h-[14px] rounded-full transition-all duration-300"
                          style={{
                            left: booth[t.key] ? "18px" : "2px",
                            background: booth[t.key] ? "#fff" : "var(--muted-foreground)",
                          }}
                        />
                      </span>
                      <span>{t.text}</span>
                    </button>
                  </div>
                ))}

                {/* meta */}
                <div
                  className="pt-4 mt-4"
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
          </div>

          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <Button variant="outline" onClick={() => goStep(3)}>
              ← Back
            </Button>
            <Button onClick={() => goStep(5)}>Continue →</Button>
          </div>
        </div>
      )}

      {/* STEP 5 — Download */}
      {step === 5 && (
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
            <ReceiptPreview id="finalReceipt" state={booth} />
          </div>

          <div className="flex gap-3 justify-center flex-wrap mt-6">
            <Button onClick={downloadReceipt}>⬇ Download receipt</Button>
            <Button
              variant="outline"
              onClick={async () => {
                await downloadReceipt();
                alert(
                  "struk tersimpan. open instagram → stories → upload from camera roll.",
                );
              }}
            >
              Share to instagram
            </Button>
            <button
              onClick={resetBooth}
              className="px-0 py-[10px] text-[11px] tracking-[0.2em] uppercase hover:text-primary transition-colors duration-200"
            >
              Take another
            </button>
          </div>

          <Card className="max-w-[480px] mx-auto mt-14 border-primary">
            <CardContent className="p-7 text-center">
              <h4 className="font-bold text-[16px] mb-3">Want a physical print?</h4>
              <p className="text-[13px] leading-[1.85] text-muted-foreground mb-5">
                digital is nice. paper is real. book a booth and bring it home in
                your wallet.
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
            <Button variant="outline" onClick={() => goStep(4)}>
              ← Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
