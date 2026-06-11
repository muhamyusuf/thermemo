import Link from "next/link";

export function SeoContent() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            free online photobooth
          </p>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            The best free online receipt photobooth for monochrome memories.
          </h2>
        </div>
        <div className="grid gap-8 text-muted-foreground md:grid-cols-2">
          <article>
            <h3 className="mb-3 font-semibold text-foreground">How to use Thermemo</h3>
            <p className="leading-7">
              Open the online photobooth, choose a receipt layout, take your
              photos, pick a thermal frame, then download the final image.
              The camera flow works in the browser and is designed for fast
              photo strips, party memories, and quiet everyday portraits.
            </p>
          </article>
          <article>
            <h3 className="mb-3 font-semibold text-foreground">Why choose Thermemo?</h3>
            <p className="leading-7">
              Thermemo focuses on receipt photobooth aesthetics: monochrome
              images, archive-style frames, thermal paper details, and private
              browser-based capture. It is built for people who want a digital
              memory that still feels physical.
            </p>
          </article>
          <article>
            <h3 className="mb-3 font-semibold text-foreground">Made for SEO, not spam</h3>
            <p className="leading-7">
              Explore dedicated guides for{" "}
              <Link className="text-primary underline-offset-4 hover:underline" href="/online-photobooth">
                online photobooth
              </Link>
              ,{" "}
              <Link className="text-primary underline-offset-4 hover:underline" href="/receipt-photobooth">
                receipt photobooth
              </Link>
              , and{" "}
              <Link className="text-primary underline-offset-4 hover:underline" href="/vintage-photobooth">
                vintage photobooth
              </Link>
              workflows.
            </p>
          </article>
          <article>
            <h3 className="mb-3 font-semibold text-foreground">Private by default</h3>
            <p className="leading-7">
              Camera access is local to your browser. Thermemo does not need an
              account or photo upload for the online booth. Downloaded receipts
              stay on your device.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
