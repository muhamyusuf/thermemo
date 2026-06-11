"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Step = 1 | 2 | 3;

interface BookingData {
  name: string;
  wa: string;
  email: string;
  people: string;
  date: string;
  time: string;
  pkg: string;
  layout: string;
  frame: string;
  request: string;
}

interface FormErrors {
  name?: string;
  wa?: string;
  date?: string;
  time?: string;
}

const TIME_SLOTS = [
  "12:00", "13:00", "14:00", "15:00", "16:00",
  "17:00", "18:00", "19:00", "20:00",
];

export default function Booking() {
  const [step, setStep] = useState<Step>(1);
  const [sent, setSent] = useState(false);
  const [refNum, setRefNum] = useState("");
  const [today, setToday] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [data, setData] = useState<BookingData>({
    name: "", wa: "", email: "", people: "1",
    date: "", time: "", pkg: "Standard Strip · Rp 35K",
    layout: "4 frames (classic)", frame: "Classic Receipt", request: "",
  });

  useEffect(() => {
    const now = new Date();
    setToday(now.toLocaleDateString("en-GB").replace(/\//g, "."));
  }, []);

  function update(field: keyof BookingData, val: string) {
    setData((d) => ({ ...d, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validateStep1(): boolean {
    const newErrors: FormErrors = {};
    if (!data.name.trim()) newErrors.name = "Nama wajib diisi";
    if (!data.wa.trim()) newErrors.wa = "WhatsApp wajib diisi";
    else if (!/^08\d{8,12}$/.test(data.wa.replace(/[\s-]/g, ""))) newErrors.wa = "Format WhatsApp tidak valid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: FormErrors = {};
    if (!data.date) newErrors.date = "Tanggal wajib dipilih";
    else {
      const selected = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = "Tanggal tidak boleh di masa lalu";
    }
    if (!selectedTime) newErrors.time = "Jam wajib dipilih";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2) {
      if (!validateStep2()) return;
      const now = new Date();
      const d = now.toLocaleDateString("en-GB").replace(/\//g, "");
      setRefNum("MEM-" + d + "-" + Math.floor(1000 + Math.random() * 9000));
    }
    setStep((s) => Math.min(s + 1, 3) as Step);
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1) as Step);
    setErrors({});
  }

  const price = data.pkg.includes("35K")
    ? "Rp 35.000"
    : data.pkg.includes("55K")
      ? "Rp 55.000"
      : "Custom";

  const waMsg = encodeURIComponent(
    `Halo thermemo!\nSaya ingin booking sesi foto:\n\nNama: ${data.name}\nTanggal: ${data.date}\nWaktu: ${selectedTime}\nPackage: ${data.pkg}\nLayout: ${data.layout}\nFrame: ${data.frame}\nJumlah orang: ${data.people}\n${data.request ? "Catatan: " + data.request + "\n" : ""}\nRef: ${refNum}\n\nMohon konfirmasi ketersediaan ya, terima kasih!`,
  );

  const stepLabels = ["Details", "Session", "Confirm"];

  return (
    <div className="max-w-[800px] mx-auto px-6 lg:px-10 pt-32 pb-20">
      <div className="text-center mb-12">
        <p className="text-muted-foreground font-mono text-[10px] tracking-[0.3em] uppercase mb-4">
          reserve a slot
        </p>
        <h1 className="font-display font-bold text-3xl lg:text-4xl">
          Book your session.
        </h1>
      </div>

      <div className="flex items-center justify-center gap-0 mb-10">
        {([1, 2, 3] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center">
            <div
              className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase"
              style={{ color: s === step ? "var(--foreground)" : "var(--muted-foreground)" }}
            >
              <span
                className="w-7 h-7 flex items-center justify-center text-[11px] rounded-full border transition-all duration-300"
                style={{
                  background:
                    s < step ? "#111111" : s === step ? "#553125" : "var(--background)",
                  color: s <= step ? "#F7F4EE" : "#111111",
                  borderColor:
                    s < step ? "#111111" : s === step ? "#553125" : "var(--border)",
                }}
              >
                {s < step ? "✓" : String(s)}
              </span>
              <span>{stepLabels[i]}</span>
            </div>
            {i < 2 && (
              <span
                className="w-14 h-px mx-1"
                style={{ background: "var(--border)" }}
              />
            )}
          </div>
        ))}
      </div>

      {!sent ? (
        <Card>
          <CardContent className="p-8 md:p-10">
            <div
              className="flex justify-between text-[10px] tracking-[0.3em] uppercase font-semibold pb-4 mb-7"
              style={{ borderBottom: "1px dashed var(--border)" }}
            >
              <span>thermemo · BOOKING FORM</span>
              <span>{today}</span>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="booking-name">Nama lengkap *</Label>
                  <Input
                    id="booking-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-destructive" role="alert">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-wa">WhatsApp *</Label>
                  <Input
                    id="booking-wa"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={data.wa}
                    onChange={(e) => update("wa", e.target.value)}
                    aria-invalid={!!errors.wa}
                    aria-describedby={errors.wa ? "wa-error" : undefined}
                  />
                  {errors.wa && (
                    <p id="wa-error" className="text-sm text-destructive" role="alert">{errors.wa}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="booking-email">Email</Label>
                  <Input
                    id="booking-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Jumlah orang</Label>
                  <Select value={data.people} onValueChange={(v) => update("people", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["1", "2", "3", "4+"].map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end pt-6 border-t border-border">
                  <Button onClick={goNext}>Next →</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="booking-date">Tanggal yang diinginkan *</Label>
                  <Input
                    id="booking-date"
                    type="date"
                    value={data.date}
                    onChange={(e) => update("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? "date-error" : undefined}
                  />
                  {errors.date && (
                    <p id="date-error" className="text-sm text-destructive" role="alert">{errors.date}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Jam yang diinginkan *</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2" role="radiogroup" aria-label="Pilih jam">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={selectedTime === t}
                        onClick={() => {
                          setSelectedTime(t);
                          setErrors((e) => ({ ...e, time: undefined }));
                        }}
                        className="py-[10px] border text-[12px] font-semibold tracking-[0.05em] text-center transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-mono)",
                          borderColor: selectedTime === t ? "#553125" : "var(--border)",
                          background: selectedTime === t ? "#553125" : "transparent",
                          color: selectedTime === t ? "#F7F4EE" : "inherit",
                          borderRadius: "2px",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {errors.time && (
                    <p className="text-sm text-destructive" role="alert">{errors.time}</p>
                  )}
                </div>

                {[
                  {
                    label: "Package",
                    name: "pkg" as const,
                    options: [
                      "Standard Strip · Rp 35K",
                      "Premium Receipt · Rp 55K",
                      "Event Package · custom",
                    ],
                  },
                  {
                    label: "Strip layout preference",
                    name: "layout" as const,
                    options: ["4 frames (classic)", "3 frames", "2 frames", "1 frame"],
                  },
                  {
                    label: "Frame design preference",
                    name: "frame" as const,
                    options: [
                      "Classic Receipt",
                      "記ノ片 Edition",
                      "Minimal Dark",
                      "Paper Grain",
                      "Archive",
                      "Ghost Club",
                    ],
                  },
                ].map((f) => (
                  <div key={f.name} className="space-y-2">
                    <Label>{f.label}</Label>
                    <Select
                      value={data[f.name]}
                      onValueChange={(v) => update(f.name, v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {f.options.map((o) => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}

                <div className="space-y-2">
                  <Label>Special request (opsional)</Label>
                  <Textarea
                    rows={3}
                    value={data.request}
                    onChange={(e) => update("request", e.target.value)}
                    className="resize-none"
                  />
                </div>

                <div className="flex justify-between pt-6 border-t border-border">
                  <Button variant="outline" onClick={goBack}>← Back</Button>
                  <Button onClick={goNext}>Next →</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="text-[10px] tracking-[0.3em] uppercase font-medium text-muted-foreground mb-4">
                  booking summary
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {[
                    ["Ref", refNum],
                    ["Nama", data.name || "—"],
                    ["WhatsApp", data.wa || "—"],
                    ["Orang", data.people],
                    ["Tanggal", data.date || "—"],
                    ["Waktu", selectedTime || "—"],
                    ["Package", data.pkg],
                    ["Layout", data.layout],
                    ["Frame", data.frame],
                    ...(data.request ? [["Request", data.request]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-baseline gap-2 py-2">
                      <span
                        className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground flex-shrink-0"
                        style={{ minWidth: "90px" }}
                      >
                        {label}
                      </span>
                      <span className="flex-1 border-b border-dotted border-muted-foreground mb-[6px]" />
                      <span className="font-bold">{value}</span>
                    </div>
                  ))}
                </div>
                <hr className="border-t border-dashed border-foreground/50 my-4" />
                <div
                  className="flex items-baseline gap-2 py-2"
                  style={{ fontFamily: "var(--font-mono)", fontSize: "13px" }}
                >
                  <span
                    className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground flex-shrink-0"
                    style={{ minWidth: "90px" }}
                  >
                    Total
                  </span>
                  <span className="flex-1 border-b border-dotted border-muted-foreground mb-[6px]" />
                  <span className="font-bold">{price}</span>
                </div>

                <div className="flex justify-between items-center mt-4 pt-6 border-t border-border flex-wrap gap-3">
                  <Button variant="outline" onClick={goBack}>← Back</Button>
                  <div className="flex gap-[10px] flex-wrap">
                    <Button variant="outline" onClick={() => setSent(true)}>
                      Send request
                    </Button>
                    <Button asChild>
                      <a
                        href={`https://wa.me/6281234567890?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Confirm via WhatsApp →
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary">
          <CardContent className="p-7 text-center">
            <div
              className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl border-2 border-primary"
              style={{
                borderRadius: "50%",
                fontFamily: "var(--font-jp)",
                color: "#553125",
              }}
            >
              記片
            </div>
            <h2 className="font-display font-bold text-2xl lg:text-3xl mb-3">
              Booking request sent.
            </h2>
            <p className="text-[15px] leading-[1.85] text-muted-foreground">
              kami akan konfirmasi via WhatsApp dalam 1 × 24 jam. terima kasih.
            </p>
            <div
              className="text-center mt-5"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "var(--muted-foreground)",
              }}
            >
              <div className="flex justify-between max-w-[300px] mx-auto py-1">
                <span>REF</span>
                <span>{refNum}</span>
              </div>
              <div className="flex justify-between max-w-[300px] mx-auto py-1">
                <span>DATE</span>
                <span>{data.date}</span>
              </div>
              <div className="flex justify-between max-w-[300px] mx-auto py-1">
                <span>TIME</span>
                <span>{selectedTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
