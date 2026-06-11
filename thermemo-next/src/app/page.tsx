import { Background } from "@/components/background";
import { HeroSection } from "@/components/blocks/hero";
import { ReceiptSamples } from "@/components/blocks/receipt-samples";
import { FeaturesSection } from "@/components/blocks/features";
import { HowItWorks } from "@/components/blocks/how-it-works";
import { TestimonialsSection } from "@/components/blocks/testimonials";
import { CtaBanner } from "@/components/blocks/cta-banner";
import { OnlineBooth } from "@/components/blocks/online-booth";
import { CommunityWall } from "@/components/blocks/community-wall";
import { SeoContent } from "@/components/blocks/seo-content";
import { BlogTeaser } from "@/components/blocks/blog-teaser";

export default function Home() {
  return (
    <>
      <Background className="via-muted to-muted/80">
        <HeroSection />
        <OnlineBooth />
        <ReceiptSamples />
        <FeaturesSection />
        <HowItWorks />
      </Background>
      <TestimonialsSection />
      <Background>
        <CommunityWall />
        <SeoContent />
        <BlogTeaser />
      </Background>
      <Background variant="bottom">
        <CtaBanner />
      </Background>
    </>
  );
}
