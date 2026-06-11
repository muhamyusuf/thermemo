"use client";

import { useEffect, useRef, useState } from "react";
import { DashedLine } from "@/components/dashed-line";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Open your camera",
    desc: "pilih layout, pilih frame, buka kamera. semua di browser.",
    icon: "▢",
  },
  {
    num: "02",
    title: "Apply filters & stamps",
    desc: "grayscale, darkroom, sepia — tambah stamp kanji atau seal.",
    icon: "記",
  },
  {
    num: "03",
    title: "Download your receipt",
    desc: "struk digital siap disimpan. atau book booth untuk cetak fisik.",
    icon: "⬇",
  },
];

export const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden pb-28 lg:pb-32">
      <div>
        <h2 className="container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Tiga langkah, satu struk.
        </h2>
        <p className="container text-center text-muted-foreground mt-4 text-lg max-w-md mx-auto">
          <span className="text-primary text-sm tracking-[0.2em] uppercase font-mono block mb-2">
            the process
          </span>
          dari browser ke dompet, kurang dari dua menit.
        </p>

        <div className="mt-8 md:mt-12 lg:mt-20">
          <DashedLine orientation="horizontal" className="container scale-x-105" />
          <div className="relative container grid md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8 transition-all duration-700",
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="text-balance">
                  <div className="font-mono text-sm text-muted-foreground mb-3 tracking-[0.2em]">
                    {step.num}
                  </div>
                  <div
                    className="text-2xl mb-3 inline-block"
                    style={{
                      fontFamily:
                        step.icon === "記" ? "var(--font-jp)" : "inherit",
                      color: "var(--primary)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <h3 className="inline font-semibold text-lg">
                    {step.title}{" "}
                  </h3>
                  <span className="text-muted-foreground"> {step.desc}</span>
                </div>

                {i < steps.length - 1 && (
                  <>
                    <DashedLine
                      orientation="vertical"
                      className="absolute top-0 right-0 max-md:hidden"
                    />
                    <DashedLine
                      orientation="horizontal"
                      className="absolute inset-x-0 bottom-0 md:hidden"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <DashedLine
          orientation="horizontal"
          className="container max-w-7xl scale-x-110"
        />

        <div
          className={cn(
            "container mt-10 transition-all duration-1000 delay-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4",
          )}
        >
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm">
            <span className="font-mono tracking-[0.2em]">▢ buka kamera</span>
            <span>→</span>
            <span className="font-mono tracking-[0.2em]">
              記 pilih filter & stamp
            </span>
            <span>→</span>
            <span className="font-mono tracking-[0.2em]">⬇ download struk</span>
          </div>
        </div>
      </div>
    </section>
  );
};
