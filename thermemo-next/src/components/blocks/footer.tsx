import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Gallery", href: "/gallery" },
    { name: "Photobooth", href: "/photobooth" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
    { name: "Booking", href: "/booking" },
  ];

  const social = [
    { name: "Instagram", href: "https://instagram.com/thermemo.id" },
    { name: "WhatsApp", href: "https://wa.me/6281234567890" },
  ];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Ready to print your memory?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Book your session — walk in atau reserve online.
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <Link href="/booking">
              Book now →
            </Link>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.name} <ArrowUpRight className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          <li>
            <span className="text-muted-foreground text-sm">
              © 2026 thermemo · Bandung, Indonesia
            </span>
          </li>
        </ul>
      </nav>

      <div className="text-primary mt-10 w-full overflow-hidden">
        <p
          className="text-center font-display font-bold lowercase tracking-[-0.04em] opacity-10"
          style={{ fontSize: "clamp(80px, 18vw, 260px)", lineHeight: 1 }}
        >
          thermemo
        </p>
      </div>
    </footer>
  );
}
