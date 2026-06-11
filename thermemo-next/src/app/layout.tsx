import localFont from "next/font/local";
import type { Metadata } from "next";
import Script from "next/script";
import { Footer } from "@/components/blocks/footer";
import { Navbar } from "@/components/blocks/navbar";
import { ErrorBoundary } from "@/components/error-boundary";
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
  metadataBase: new URL("https://thermemo.id"),
  title: { default: "thermemo · proof that this moment happened.", template: "%s | thermemo" },
  description: "Receipt photobooth untuk momen kecil yang layak disimpan. struk tipis, kenangan padat.",
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "thermemo",
    title: "thermemo · proof that this moment happened.",
    description: "Receipt photobooth untuk momen kecil yang layak disimpan. struk tipis, kenangan padat — bukti bahwa malam ini benar-benar terjadi.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "thermemo receipt photobooth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "thermemo · proof that this moment happened.",
    description: "Receipt photobooth untuk momen kecil yang layak disimpan.",
    images: ["/og-image.png"],
  },
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R5GM0GFGRK"
          strategy="afterInteractive"
        />
        <Script id="thermemo-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R5GM0GFGRK');
          `}
        </Script>
        <Script id="thermemo-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "wmdxm5nh7t");
          `}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6384260983473792"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Navbar />
        <ErrorBoundary>
          <main id="main-content">{children}</main>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
