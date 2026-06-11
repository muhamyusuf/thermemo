import type { Metadata } from "next";
import { Background } from "@/components/background";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Thermemo privacy policy for browser camera access, downloaded photos, analytics, and contact data.",
};

export default function PrivacyPage() {
  return (
    <Background>
      <div className="container max-w-3xl pt-32 pb-20 lg:pt-44">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          privacy policy
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Your photos stay yours.
        </h1>
        <div className="prose prose-neutral mt-10 max-w-none">
          <h2>Online photobooth</h2>
          <p>
            Thermemo online photobooth uses browser camera access only after you
            grant permission. Camera frames and uploaded images are processed in
            your browser to create the downloadable receipt image.
          </p>
          <h2>No required photo upload</h2>
          <p>
            The online booth does not require an account or backend upload to
            generate your receipt. Downloaded receipt images stay on your device
            unless you choose to share them.
          </p>
          <h2>Analytics</h2>
          <p>
            Thermemo may use analytics tools such as Google Analytics, Microsoft
            Clarity, Cloudflare Insights, and advertising tags to understand site
            performance, booth usage, and campaign effectiveness. These tools do
            not need your generated receipt image to function.
          </p>
          <h2>Booking and contact</h2>
          <p>
            If you contact Thermemo or book a physical session, we may receive
            the details you submit, such as name, contact information, event
            notes, and preferred schedule.
          </p>
        </div>
      </div>
    </Background>
  );
}
