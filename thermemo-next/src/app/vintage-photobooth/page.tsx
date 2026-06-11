import type { Metadata } from "next";
import { Background } from "@/components/background";
import { SeoLanding } from "@/components/blocks/seo-landing";

export const metadata: Metadata = {
  title: "Vintage Photobooth",
  description: "Create vintage black-and-white photobooth strips with Thermemo's browser-based receipt photobooth.",
};

export default function VintagePhotoboothPage() {
  return (
    <Background>
      <SeoLanding
        eyebrow="vintage photobooth"
        title="A vintage photobooth for monochrome receipt memories."
        description="Thermemo gives digital photo strips the feeling of old paper, black-and-white booths, archived notes, and thermal receipt keepsakes."
        sections={[
          {
            title: "Vintage without fake nostalgia",
            body: "Thermemo uses monochrome contrast, paper-like layouts, and minimal typography instead of heavy filters or decorative clutter.",
          },
          {
            title: "Black-and-white by design",
            body: "Every captured or uploaded image is converted into a monochrome receipt look, giving the final strip a consistent vintage photobooth feel.",
          },
          {
            title: "Perfect for stories and events",
            body: "The final receipt image works as a story post, a party memory, an event recap asset, or a digital keepsake you can send to friends.",
          },
          {
            title: "Try it instantly",
            body: "Choose a layout, pick an archive-inspired frame, capture your photos, and download the final vintage receipt photobooth image.",
          },
        ]}
      />
    </Background>
  );
}
