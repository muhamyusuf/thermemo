"use client";

import Link from "next/link";
import { Archive, Camera, LockKeyhole, Printer, Receipt } from "lucide-react";
import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

const features = [
  { title: "Instant thermal print", description: "cetakan langsung jadi. tidak menunggu.", icon: Printer },
  { title: "Collectible receipt", description: "nomor sesi unik. layak dikumpulkan.", icon: Receipt },
  { title: "Monochrome aesthetic", description: "hanya hitam-putih. tidak ada filter.", icon: Camera },
  { title: "Physical memory", description: "file foto bisa hilang. struk tidak.", icon: Archive },
];

const floatingElements = [
  { content: "記", x: "8%", y: "15%", delay: "0s", size: "28px", rotate: "-12deg" },
  { content: "片", x: "88%", y: "20%", delay: "1.2s", size: "22px", rotate: "8deg" },
  { content: "·", x: "12%", y: "75%", delay: "0.6s", size: "32px", rotate: "0deg" },
  { content: "ノ", x: "85%", y: "70%", delay: "1.8s", size: "20px", rotate: "-6deg" },
];

export const HeroSection = () => {
  return (
    <section className="py-28 lg:py-32 lg:pt-44 relative overflow-hidden">
      {floatingElements.map((el, i) => (
        <div
          key={i}
          className="floating-decor absolute pointer-events-none select-none max-lg:hidden"
          style={{
            left: el.x,
            top: el.y,
            fontFamily: "var(--font-jp)",
            fontSize: el.size,
            color: "var(--primary)",
            opacity: 0.12,
            transform: `rotate(${el.rotate})`,
            animationDelay: el.delay,
          }}
        >
          {el.content}
        </div>
      ))}

      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20 relative z-10">
        <div className="flex-1">
          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl font-bold lowercase">
            thermemo
          </h1>
          <p
            className="text-primary text-xl mt-3 md:text-2xl"
            style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
          >
            Proof that this moment happened.
          </p>
          <p className="text-muted-foreground text-lg mt-4 md:text-xl max-w-md">
            Online and physical receipt photobooth untuk momen kecil yang layak disimpan.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild>
              <Link href="/photobooth">Start the Booth</Link>
            </Button>
            <Button
              variant="outline"
              className="from-background h-auto gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <Link href="/booking">Book a session</Link>
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
            {["No app required", "100% browser-based", "Monochrome by design"].map((item) => (
              <span key={item} className="inline-flex items-center gap-1 border bg-card px-3 py-1.5">
                <LockKeyhole className="size-3 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute top-0 left-0 max-lg:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute top-0 lg:hidden"
          />
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="text-foreground mt-1 size-4 shrink-0 lg:size-5" />
                <div>
                  <h2 className="font-text text-foreground font-semibold">
                    {feature.title}
                  </h2>
                  <p className="text-muted-foreground max-w-76 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 max-lg:ml-6 max-lg:h-[200px] max-lg:overflow-hidden md:mt-20 lg:container lg:mt-24">
        <div
          className="relative w-full rounded-sm border border-dashed"
          style={{ aspectRatio: "16/5", background: "linear-gradient(135deg, #EFEADF 0%, #DCD8D1 50%, #B8B2A9 100%)" }}
        >
          <div className="absolute inset-0 flex items-center justify-center gap-12 opacity-30 px-10">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-foreground/20"
                style={{ width: "80px", height: "80%", borderRadius: "1px" }}
              />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-foreground/30 text-sm tracking-[0.4em] uppercase font-mono">
              thermemo · 記ノ片 · receipt photobooth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
