import { Background } from "@/components/background";
import { HeroSection } from "@/components/blocks/hero";
import { ReceiptSamples } from "@/components/blocks/receipt-samples";
import { FeaturesSection } from "@/components/blocks/features";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { TestimonialsSection } from "@/components/blocks/testimonials";
import { CtaBanner } from "@/components/blocks/cta-banner";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <HeroSection />
        <ReceiptSamples />
        <FeaturesSection />
        <HowItWorks />
      </Background>
      <TestimonialsSection />
      <Background variant="bottom">
        <CtaBanner />
      </Background>
    </>
  );
}
