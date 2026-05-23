import localFont from "next/font/local";
import type { Metadata } from "next";
import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import "@/styles/globals.css";

const thermemoSans = localFont({
  src: [
    { path: "../../fonts/dm-sans/DMSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../../fonts/dm-sans/DMSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/dm-sans/DMSans-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "thermemo · proof that this moment happened.", template: "%s | thermemo" },
  description: "Receipt photobooth untuk momen kecil yang layak disimpan. struk tipis, kenangan padat.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${thermemoSans.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
