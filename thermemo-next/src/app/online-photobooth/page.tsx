import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SeoLanding } from "@/components/blocks/seo-landing";

export const metadata: Metadata = {
  title: "Free Online Photobooth",
  description: "Use Thermemo as a free online photobooth to make monochrome receipt-style photo strips in your browser.",
};

export default function OnlinePhotoboothPage() {
  return (
    <Background>
      <SeoLanding
        eyebrow="free online photobooth"
        title="A free online photobooth for receipt-style photo strips."
        description="Take camera photos, upload existing shots, choose a thermal receipt frame, and download the final memory without installing an app."
        sections={[
          {
            title: "How to use the online photobooth",
            body: "Open the booth, choose how many frames you want, allow camera access, take each shot, then customize the receipt caption and metadata before downloading.",
          },
          {
            title: "Built for fast aesthetic edits",
            body: "Thermemo keeps the process simple: monochrome capture, thermal paper styling, and a final receipt image that works for stories, posts, notes, and personal archives.",
          },
          {
            title: "No account required",
            body: "The online photobooth runs in the browser. You can create a digital receipt without signing in or sending your photos to a backend service.",
          },
          {
            title: "Online or physical",
            body: "Use the web booth for instant digital keepsakes, then book the physical Thermemo booth when you want a real thermal print for an event or visit.",
          },
        ]}
      />
    </Background>
  );
}
