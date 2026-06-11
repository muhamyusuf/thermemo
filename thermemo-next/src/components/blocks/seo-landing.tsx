import Link from "next/link";
import { ArrowRight, Camera, Download, LockKeyhole, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";

type SeoLandingProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: { title: string; body: string }[];
};

export function SeoLanding({ eyebrow, title, description, sections }: SeoLandingProps) {
  return (
    <div className="container pt-32 pb-20 lg:pt-44">
      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/photobooth">Start the Booth</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/booking">Book a physical session</Link>
            </Button>
          </div>
        </div>

        <div className="border bg-card p-6 shadow-receipt">
          <div className="mx-auto w-full max-w-[320px] border bg-background px-5 py-6">
            <div className="mb-4 text-center text-lg font-bold lowercase">thermemo</div>
            <div className="mb-5 border-b border-dashed pb-4 text-center text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              記ノ片 · proof receipt
            </div>
            <div className="grid gap-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="aspect-[4/3] bg-muted">
                  <div className="h-full bg-[repeating-linear-gradient(45deg,rgba(17,17,17,0.08)_0_5px,transparent_5px_10px)]" />
                </div>
              ))}
            </div>
            <p className="mt-5 text-center font-accent text-xl text-primary">
              a small moment.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 py-20 md:grid-cols-4">
        {[
          { icon: Camera, title: "Camera-ready" },
          { icon: Receipt, title: "Receipt frames" },
          { icon: LockKeyhole, title: "Private browser flow" },
          { icon: Download, title: "Instant download" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="border bg-card p-5">
              <Icon className="mb-8 size-5 text-primary" />
              <h2 className="font-semibold">{item.title}</h2>
            </div>
          );
        })}
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        {sections.map((section) => (
          <article key={section.title} className="border-t pt-6">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
          </article>
        ))}
      </section>

      <Link
        href="/how-to-use"
        className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
      >
        Read the full guide <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
