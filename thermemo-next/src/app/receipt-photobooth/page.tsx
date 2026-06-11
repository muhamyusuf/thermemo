import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SeoLanding } from "@/components/blocks/seo-landing";

export const metadata: Metadata = {
  title: "Receipt Photobooth",
  description: "Thermemo is a receipt photobooth for monochrome memories, online photo strips, and physical thermal-style keepsakes.",
};

export default function ReceiptPhotoboothPage() {
  return (
    <Background>
      <SeoLanding
        eyebrow="receipt photobooth"
        title="Receipt photobooth for moments that feel worth keeping."
        description="Thermemo turns booth photos into receipt memories: black-and-white frames, session numbers, captions, paper texture, and a quiet archival feel."
        sections={[
          {
            title: "What is a receipt photobooth?",
            body: "A receipt photobooth creates photo strips that look and feel like saved receipts. Instead of glossy prints, Thermemo leans into thermal paper, monochrome tone, and small metadata details.",
          },
          {
            title: "Why receipt photos feel personal",
            body: "Receipts are ordinary objects people accidentally keep. Thermemo uses that language intentionally, making each photo strip feel like proof that a small moment happened.",
          },
          {
            title: "Digital receipt download",
            body: "The online booth creates a downloadable image with receipt-style layout, frame selection, caption, date, and session number.",
          },
          {
            title: "Physical booth booking",
            body: "For events, pop-ups, and visits in Bandung, Thermemo can turn the same receipt idea into a physical booth experience.",
          },
        ]}
      />
    </Background>
  );
}
