import type { Metadata } from "next";
import Link from "next/link";
import { Background } from "@/components/background";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "How to Use Thermemo",
  description: "A simple guide to using Thermemo online photobooth and downloading receipt-style photo strips.",
};

const steps = [
  ["Choose your receipt length", "Pick one, two, three, or four frames depending on how much of the moment you want to keep."],
  ["Pick a receipt style", "Choose classic, archive, paper grain, dark, or a Thermemo signature frame."],
  ["Capture or upload photos", "Use your browser camera or upload photos from your device. Camera access stays local."],
  ["Customize the final receipt", "Add a short caption, choose metadata options, and preview the final strip."],
  ["Download and share", "Save the receipt image, copy @thermemo.id #thermemo, then post it or keep it privately."],
];

export default function HowToUsePage() {
  return (
    <Background>
      <div className="container pt-32 pb-20 lg:pt-44">
        <div className="max-w-3xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            how to guide
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            How to use Thermemo online photobooth.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Thermemo is designed to be quick: open the booth, take your shots,
            make a receipt, download the proof.
          </p>
          <div className="mt-8">
            <Button asChild>
              <Link href="/photobooth">Start the Booth</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-5">
          {steps.map(([title, body], index) => (
            <article key={title} className="grid gap-4 border bg-card p-6 shadow-receipt md:grid-cols-[80px_1fr]">
              <div className="font-mono text-sm text-primary">0{index + 1}</div>
              <div>
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="mt-2 leading-7 text-muted-foreground">{body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Background>
  );
}
