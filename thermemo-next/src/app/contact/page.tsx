import { Background } from "@/components/background";
import Contact from "@/components/blocks/contact";

export const metadata = {
  title: "Contact",
  description: "Hubungi thermemo — booth foto receipt di Bandung.",
};

export default function ContactPage() {
  return (
    <Background>
      <Contact />
    </Background>
  );
}
