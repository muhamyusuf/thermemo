import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const columns = [
    {
      title: "Tools",
      links: [
        { name: "Online Photobooth", href: "/photobooth" },
        { name: "How to Use", href: "/how-to-use" },
      ],
    },
    {
      title: "Explore",
      links: [
        { name: "Gallery", href: "/gallery" },
        { name: "Blog & Tips", href: "/blog" },
        { name: "Our Story", href: "/about" },
        { name: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Visit",
      links: [
        { name: "Booking", href: "/booking" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const social = [
    { name: "Instagram", href: "https://instagram.com/thermemo.id" },
    { name: "WhatsApp", href: "https://wa.me/6281234567890" },
  ];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container max-w-2xl space-y-3 text-center">
        <p
          className="text-primary text-xl"
          style={{ fontFamily: "var(--font-accent)", fontStyle: "italic" }}
        >
          Proof that this moment happened.
        </p>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance text-sm">
          struk kecil, kenangan padat. thermemo receipt photobooth — Bandung, sejak 2025.
        </p>
      </div>

      <nav className="container grid gap-10 border-t pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              {column.title}
            </h3>
            <ul className="space-y-3">
              {column.links.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="container flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>© 2026 thermemo · receipt photobooth · 記ノ片</span>
        <div className="flex gap-5">
          {social.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name} <ArrowUpRight className="size-4" />
            </Link>
          ))}
        </div>
      </div>

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
