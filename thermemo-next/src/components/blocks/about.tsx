import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dnaTerms = [
  {
    term: "Thermal",
    sub: "記",
    desc: "panas yang menciptakan gambar. bukan tinta, bukan warna. hanya hitam-putih yang jujur.",
  },
  {
    term: "Memento",
    sub: "片",
    desc: "sebuah objek untuk mengingat. bukan foto yang tersimpan di cloud — tapi kertas yang tersimpan di saku.",
  },
  {
    term: "Receipt",
    sub: "ノ",
    desc: "format yang familiar. struk yang biasanya dibuang, kami jadikan sesuatu yang disimpan dengan sengaja.",
  },
  {
    term: "記ノ片",
    sub: "ki·no·ka·ta",
    desc: "fragmen kenangan. kanji gabungan yang menjadi identitas thermemo — tanda di setiap struk yang kami cetak.",
    jp: true,
  },
];

const AboutSection = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Left column - DNA terms */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <div className="grid grid-cols-2 gap-6">
          {dnaTerms.map((item) => (
            <div key={item.term} className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span
                  className="text-3xl font-bold"
                  style={item.jp ? { fontFamily: "var(--font-jp)", color: "var(--primary)" } : { color: "var(--primary)" }}
                >
                  {item.sub}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold">{item.term}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right column - text */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <section className="flex-1 space-y-4 text-lg md:space-y-6">
          <h2 className="text-foreground text-4xl">Tentang kami</h2>
          <div className="text-muted-foreground max-w-xl space-y-6">
            <p>
              thermemo adalah receipt photobooth berbasis di Bandung. kami
              percaya bahwa kenangan terbaik tidak harus disimpan di cloud — tapi
              bisa dipegang, dilipat, dan dibawa pulang dalam saku.
            </p>
            <p>
              booth kami kecil, intentional, dan dibuat untuk satu-dua orang.
              tidak ada lighting studio, tidak ada pose kaku. hanya kamu, kamera,
              dan 90 detik untuk mengabadikan sesuatu yang layak disimpan.
            </p>
            <p>
              setiap struk yang kami cetak punya nomor sesi unik, timestamp, dan
              seal 記ノ片 — tanda bahwa ini pernah terjadi.
            </p>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg">Hubungi kami</Button>
            </Link>
          </div>
        </section>

        {/* receipt mockups replacing images */}
        <div className={cn("flex flex-col gap-6 hidden lg:flex xl:translate-x-10")}>
          {[
            { bg: "linear-gradient(135deg, #EFEADF 0%, #DCD8D1 100%)", text: "記ノ片 · portrait" },
            { bg: "linear-gradient(160deg, #b0aba2, #3b3631)", text: "記ノ片 · group" },
          ].map((mock, i) => (
            <div
              key={i}
              className="relative aspect-[2/1.5] overflow-hidden"
              style={{ background: mock.bg, borderRadius: "2px", border: "1px solid var(--border)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-sm tracking-[0.3em] font-mono opacity-40"
                >
                  {mock.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
