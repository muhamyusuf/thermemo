import { DashedLine } from "@/components/dashed-line";

const stats = [
  { value: "90s", label: "Waktu per sesi" },
  { value: "58mm", label: "Lebar receipt" },
  { value: "12", label: "Frame templates" },
  { value: "記ノ片", label: "ki no kata" },
];

export function AboutHero() {
  return (
    <section>
      <div className="container flex max-w-5xl flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
        <div className="flex-[1.5]">
          <h1 className="text-3xl tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            A small studio for small proofs.
          </h1>

          <p
            className="text-primary mt-5 text-2xl md:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
          >
            Proof that this moment happened.
          </p>

          <p className="text-muted-foreground mt-8 hidden max-w-lg space-y-6 text-lg text-balance md:block lg:mt-12">
            thermemo lahir dari satu keyakinan: bahwa ada kenangan kecil yang
            terlalu berharga untuk hanya tersimpan di folder foto yang tidak
            pernah dibuka lagi.
            <br />
            <br />
            kami membuat receipt photobooth — cetak langsung di atas kertas
            thermal hitam-putih, dalam format struk yang bisa kamu lipat dan
            simpan di dompet. karena kenangan terbaik adalah yang bisa kamu
            pegang.
          </p>
        </div>

        <div className="relative flex flex-1 flex-col justify-center gap-3 pt-10 lg:pt-0 lg:pl-10">
          <DashedLine orientation="vertical" className="absolute top-0 left-0 max-lg:hidden" />
          <DashedLine orientation="horizontal" className="absolute top-0 lg:hidden" />
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <div
                className="font-display text-4xl tracking-wide md:text-5xl"
                style={stat.value === "記ノ片" ? { fontFamily: "var(--font-jp)" } : {}}
              >
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
