import { Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Standard Strip",
    price: "Rp 35K",
    per: "per session",
    description: "satu sesi, satu struk.",
    featured: false,
    features: [
      "1–4 foto per strip",
      "6 pilihan frame design",
      "Monochrome thermal print",
      "Nomor sesi unik",
      "Digital copy tersedia",
    ],
    cta: "Book now",
    href: "/booking",
  },
  {
    name: "Premium Receipt",
    price: "Rp 55K",
    per: "per session",
    description: "lebih banyak cetak, lebih banyak kenangan.",
    featured: true,
    features: [
      "Semua dari Standard +",
      "2 cetakan receipt",
      "Custom caption",
      "Frame prioritas",
      "Walk-in priority slot",
    ],
    cta: "Book now",
    href: "/booking",
  },
  {
    name: "Event Package",
    price: "Custom",
    per: "tailored to event",
    description: "untuk gathering, pop-up, dan event brand.",
    featured: false,
    features: [
      "Mulai dari 50 tamu",
      "Booth operator included",
      "Custom receipt design",
      "Branding option",
      "Konsultasi langsung",
    ],
    cta: "Hubungi kami",
    href: "/contact",
  },
];

export const Pricing = ({ className }: { className?: string }) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className="space-y-4 text-center">
          <p className="text-muted-foreground font-mono text-sm tracking-[0.2em] uppercase">
            pricing
          </p>
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Satu struk, seharga secangkir kopi.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            tidak ada subscription. tidak ada komitmen. bayar per sesi.
          </p>
        </div>

        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.featured ? "outline-primary origin-top outline-4" : ""}
            >
              <CardContent className="flex flex-col gap-7 px-6 py-5">
                <div className="space-y-2">
                  <h3 className="text-foreground font-semibold">{plan.name}</h3>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-lg font-medium">
                      {plan.price}{" "}
                      <span className="text-sm">{plan.per}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="text-muted-foreground flex items-center gap-1.5"
                    >
                      <Check className="size-5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-fit"
                  variant={plan.featured ? "default" : "outline"}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
