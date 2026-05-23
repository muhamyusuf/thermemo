import { Background } from "@/components/background";
import { Pricing } from "@/components/blocks/pricing";
import { FAQ } from "@/components/blocks/faq";

export const metadata = {
  title: "Pricing",
  description: "Harga sesi thermemo receipt photobooth. Mulai dari Rp 35K per sesi.",
};

export default function PricingPage() {
  return (
    <Background>
      <Pricing className="py-28 text-center lg:pt-44 lg:pb-32" />
      <FAQ />
    </Background>
  );
}
