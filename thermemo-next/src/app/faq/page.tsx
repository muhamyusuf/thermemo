import { Background } from "@/components/background";
import { FAQ } from "@/components/blocks/faq";

export const metadata = {
  title: "FAQ",
  description: "Pertanyaan yang sering ditanyakan tentang thermemo receipt photobooth.",
};

export default function FaqPage() {
  return (
    <Background>
      <FAQ className="py-28 lg:pt-44" headerTag="h1" />
    </Background>
  );
}
