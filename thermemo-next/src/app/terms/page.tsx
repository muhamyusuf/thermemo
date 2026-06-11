import type { Metadata } from "next";
import { Background } from "@/components/background";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Thermemo terms of service for online photobooth use, downloads, bookings, and site content.",
};

export default function TermsPage() {
  return (
    <Background>
      <div className="container max-w-3xl pt-32 pb-20 lg:pt-44">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          terms of service
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Use Thermemo with care.
        </h1>
        <div className="prose prose-neutral mt-10 max-w-none">
          <h2>Online photobooth use</h2>
          <p>
            You are responsible for the photos you capture, upload, download,
            and share through Thermemo. Do not use the booth to create or share
            unlawful, harmful, or non-consensual content.
          </p>
          <h2>Downloads</h2>
          <p>
            Receipt images are provided as digital keepsakes. Thermemo cannot
            guarantee that every browser, device, or camera will produce the same
            visual result.
          </p>
          <h2>Bookings</h2>
          <p>
            Physical booth bookings are subject to confirmation, availability,
            payment terms, and event requirements agreed with Thermemo.
          </p>
          <h2>Site content</h2>
          <p>
            Thermemo brand assets, written content, receipt designs, and visual
            systems belong to Thermemo unless otherwise stated.
          </p>
        </div>
      </div>
    </Background>
  );
}
