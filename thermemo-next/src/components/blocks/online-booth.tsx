import Link from "next/link";
import { Camera, Download, LockKeyhole, Stamp } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { title: "Take your shots", text: "camera or upload, both stay in-browser.", icon: Camera },
  { title: "Apply filters & stamps", text: "thermal, darkroom, sepia — plus kanji stamps.", icon: Stamp },
  { title: "Save the proof", text: "download or share your receipt memory.", icon: Download },
];

export function OnlineBooth() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            online studio
          </p>
          <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
            Make a receipt memory without leaving your browser.
          </h2>
          <p className="mt-5 max-w-lg text-muted-foreground leading-7">
            Thermemo online photobooth turns camera shots into a thermal-style
            monochrome receipt. No app, no account, no upload.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/photobooth">Start the Booth</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/receipt-photobooth">Receipt photobooth</Link>
            </Button>
          </div>
          <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <LockKeyhole className="size-4 text-primary" />
            Runs locally in your browser.
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="border bg-card p-5 shadow-receipt">
                <div className="mb-10 flex items-center justify-between">
                  <Icon className="size-5 text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
