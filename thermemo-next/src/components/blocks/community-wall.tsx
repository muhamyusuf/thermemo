"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunityEntry {
  handle: string;
  caption: string;
  date: string;
  session: string;
  rotation: number;
}

const COMMUNITY: CommunityEntry[] = [
  { handle: "@nara.notes", caption: "malam yang tidak ingin berakhir.", date: "12.05.26", session: "0038", rotation: -1.2 },
  { handle: "@mina.archive", caption: "dua kopi, satu struk.", date: "14.05.26", session: "0039", rotation: 0.8 },
  { handle: "@tomm.foto", caption: "sebelum dia pindah.", date: "15.05.26", session: "0040", rotation: -0.5 },
  { handle: "@lara.clicks", caption: "reuni kecil yang tertunda.", date: "16.05.26", session: "0041", rotation: 1.1 },
  { handle: "@studio.r", caption: "cahaya jendela jam empat.", date: "17.05.26", session: "0042", rotation: -0.9 },
  { handle: "@bandungweekend", caption: "pasar malam, hari kedua.", date: "18.05.26", session: "0043", rotation: 0.6 },
  { handle: "@quietframes", caption: "belajar diam sebentar.", date: "19.05.26", session: "0044", rotation: -1.4 },
  { handle: "@afterhours.id", caption: "kamu lagi tertawa.", date: "20.05.26", session: "0045", rotation: 0.3 },
  { handle: "@dimas.film", caption: "struk pertama, bukan terakhir.", date: "21.05.26", session: "0046", rotation: -0.7 },
  { handle: "@rini.jpeg", caption: "tiga tahun, satu frame.", date: "22.05.26", session: "0047", rotation: 1.3 },
  { handle: "@fajar.raw", caption: "bukti bahwa ini nyata.", date: "23.05.26", session: "0048", rotation: -0.4 },
  { handle: "@alma.shoot", caption: "malam yang cepat berlalu.", date: "24.05.26", session: "0049", rotation: 0.9 },
];

const TONE_GRADIENTS = [
  "linear-gradient(160deg, #b0aba2, #3b3631)",
  "linear-gradient(200deg, #d4cfc6, #2a2622)",
  "linear-gradient(135deg, #9b9690, #545049)",
  "linear-gradient(180deg, #cac4ba, #6a625a)",
  "linear-gradient(220deg, #88847e, #1a1816)",
  "linear-gradient(160deg, #d8d3ca, #4a443e)",
];

export function CommunityWall() {
  const [copied, setCopied] = useState(false);

  async function copyTag() {
    await navigator.clipboard?.writeText("@thermemo.id #thermemo");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="py-24 lg:py-32">
      <div className="container">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              community scrapbook
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              Shared by people who kept the receipt.
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg text-sm leading-6">
              ambil foto di booth, share di instagram, tag kami — kami feature
              kamu di sini.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={copyTag}>
              <Copy className="size-4" />{" "}
              {copied ? "Copied!" : "Copy tag"}
            </Button>
            <Button asChild>
              <Link
                href="https://instagram.com/thermemo.id"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="size-4" /> Open Instagram
              </Link>
            </Button>
          </div>
        </div>

        <div className="mb-8 p-5 border bg-card" style={{ borderRadius: 2 }}>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
            get featured · 3 steps
          </p>
          <div className="flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                1
              </span>
              take a photo in the booth
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                2
              </span>
              share on instagram
            </span>
            <span className="flex items-center gap-2">
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                3
              </span>
              tag @thermemo.id #thermemo
            </span>
          </div>
        </div>

        <div className="mb-6 p-4 border border-dashed bg-muted/50 text-center" style={{ borderRadius: 2 }}>
          <p className="text-xs text-muted-foreground">
            scrapbook ini menampilkan sample entries. foto asli dari community kami akan segera ditampilkan di sini — stay tuned.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {COMMUNITY.map((entry, index) => (
            <div
              key={entry.handle}
              className="border bg-card p-3 text-sm shadow-receipt transition-transform hover:scale-[1.03] hover:z-10"
              style={{
                transform: `rotate(${entry.rotation}deg)`,
                borderRadius: 2,
              }}
            >
              <div
                className="mb-3 aspect-[3/4] overflow-hidden"
                style={{
                  background: TONE_GRADIENTS[index % TONE_GRADIENTS.length],
                  borderRadius: 1,
                }}
              />
              <div className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground font-mono flex justify-between mb-1">
                <span>thermemo</span>
                <span>{entry.date}</span>
              </div>
              <p
                className="text-[11px] italic leading-tight"
                style={{
                  fontFamily: "var(--font-accent)",
                  color: "var(--primary)",
                }}
              >
                {entry.caption}
              </p>
              <div className="mt-2 flex justify-between items-center">
                <p className="font-semibold text-[10px] tracking-[0.1em]">
                  {entry.handle}
                </p>
                <span className="text-[8px] text-muted-foreground font-mono">
                  NO.{entry.session}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            your receipt could be next on this wall.
          </p>
          <Button asChild>
            <Link href="/photobooth">Start the Booth</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
