"use client";

import { useState } from "react";
import { Background } from "@/components/background";
import { ReceiptCard } from "@/components/receipt-card";
import { Button } from "@/components/ui/button";
import { SAMPLE_RECEIPTS } from "@/lib/data";

const FILTERS = ["All", "Portrait", "Group", "Event", "Solo"] as const;
type Filter = (typeof FILTERS)[number];

export default function GalleryPage() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All"
    ? SAMPLE_RECEIPTS
    : SAMPLE_RECEIPTS.filter(
        (r) => r.cat.toLowerCase() === active.toLowerCase(),
      );

  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-32">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-muted-foreground font-mono text-sm tracking-[0.3em] uppercase mb-3">
              archive · 記ノ片
            </p>
            <h1 className="text-3xl tracking-tight md:text-4xl lg:text-5xl mb-4">
              Fragments, collected.
            </h1>
            <p
              className="text-primary text-xl"
              style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
            >
              bukti bahwa ini pernah terjadi.
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12 p-5 border bg-card text-center" style={{ borderRadius: 2 }}>
            <p className="text-sm text-muted-foreground leading-6">
              gallery ini menampilkan sample receipt dari sesi-sesi thermemo.
              foto asli dari customer kami akan segera ditampilkan di sini.
              sementara itu, coba{" "}
              <a href="/photobooth" className="text-primary font-semibold underline-offset-4 hover:underline">
                photobooth online
              </a>{" "}
              untuk melihat bagaimana struk kamu akan terlihat.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {FILTERS.map((f) => (
              <Button
                key={f}
                variant={active === f ? "default" : "outline"}
                size="sm"
                onClick={() => setActive(f)}
              >
                {f}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8 justify-items-center">
            {filtered.map((r) => (
              <ReceiptCard
                key={r.num}
                date={r.date}
                num={r.num}
                cat={r.cat}
                cap={r.cap}
                side={r.side}
                tone={r.tone}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">
              Belum ada foto di kategori ini.
            </p>
          )}
        </div>
      </section>
    </Background>
  );
}
