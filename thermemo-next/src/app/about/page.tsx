import { Background } from "@/components/background";
import { AboutHero } from "@/components/blocks/about-hero";
import AboutSection from "@/components/blocks/about";

export const metadata = {
  title: "About",
  description: "Tentang thermemo — receipt photobooth dari Bandung untuk momen kecil yang layak disimpan.",
};

export default function AboutPage() {
  return (
    <Background>
      <section className="py-28 lg:pt-44 lg:pb-20">
        <AboutHero />
      </section>
      <AboutSection />
      <div className="pb-28 lg:pb-32" />
    </Background>
  );
}
