import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner({ className }: { className?: string }) {
  return (
    <section className={`py-28 lg:py-32 ${className ?? ""}`}>
      <div className="container space-y-6 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Ready to print your memory?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance text-lg">
          Book your session today — walk in atau reserve online.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/booking">Book now →</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
