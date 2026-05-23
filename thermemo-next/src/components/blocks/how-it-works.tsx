import { DashedLine } from "@/components/dashed-line";
import { cn } from "@/lib/utils";

const steps = [
  { num: "01", title: "Strike a pose", desc: "masuk booth. tarik nafas. ambil shot." },
  { num: "02", title: "Printed in seconds", desc: "thermal printer mencetak foto dalam hitungan detik." },
  { num: "03", title: "Keep the proof", desc: "struk dibawa pulang. kenangan jadi benda." },
];

export const HowItWorks = () => {
  return (
    <section className="overflow-hidden pb-28 lg:pb-32">
      <div>
        <h2 className="container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
          Tiga langkah, satu struk.
        </h2>
        <p className="container text-center text-muted-foreground mt-4 text-lg max-w-md mx-auto">
          <span
            className="text-primary text-sm tracking-[0.2em] uppercase font-mono block mb-2"
          >
            the process
          </span>
          dari booth ke dompet, kurang dari dua menit.
        </p>

        <div className="mt-8 md:mt-12 lg:mt-20">
          <DashedLine orientation="horizontal" className="container scale-x-105" />
          <div className="relative container grid md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8",
                )}
              >
                <div className="text-balance">
                  <div
                    className="font-mono text-sm text-muted-foreground mb-3 tracking-[0.2em]"
                  >
                    {step.num}
                  </div>
                  <h3 className="inline font-semibold text-lg">{step.title} </h3>
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
        <DashedLine orientation="horizontal" className="container max-w-7xl scale-x-110" />
      </div>
    </section>
  );
};
