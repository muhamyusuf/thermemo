import { DashedLine } from "@/components/dashed-line";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { glyph: "記", title: "Instant thermal print", desc: "cetakan langsung jadi. tidak menunggu." },
  { glyph: "片", title: "Collectible receipt design", desc: "setiap struk punya nomor sesi unik." },
  { glyph: "·", title: "Monochrome aesthetic", desc: "hanya hitam-putih. tidak ada filter alay." },
  { glyph: "○", title: "Personal & intimate", desc: "booth kecil. dibuat untuk satu-dua orang." },
  { glyph: "□", title: "Compact portable booth", desc: "muat di pojok cafe, sudut event." },
  { glyph: "▽", title: "Memory as physical object", desc: "file foto bisa hilang. struk di dompet tidak." },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            KENAPA THERMEMO
          </span>
        </div>

        {/* Content header */}
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Dibuat untuk momen kecil.
          </h2>
          <p className="text-muted-foreground leading-snug">
            Setiap detail thermemo dirancang agar kenangan bisa dibawa pulang dalam saku — bukan di folder yang terlupakan.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8 md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 flex-wrap">
            {features.map((feature, i) => (
              <div key={i} className="flex flex-1 min-w-[200px] max-md:flex-col">
                <div className="flex-1 p-4 md:p-6">
                  <div
                    className="text-4xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-jp)", color: "var(--primary)" }}
                  >
                    {feature.glyph}
                  </div>
                  <h3 className="font-display text-xl leading-tight font-bold tracking-tight mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
                {i < features.length - 1 && i % 3 !== 2 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
