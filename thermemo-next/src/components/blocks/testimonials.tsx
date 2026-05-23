import { DashedLine } from "@/components/dashed-line";
import { ReceiptCard } from "@/components/receipt-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const testimonialsData = [
  {
    quote: "masih kusimpan di dompet, tujuh bulan kemudian.",
    author: "Rania K.",
    detail: "thermemo sesi #0021",
    receipt: TESTIMONIALS[0],
  },
  {
    quote: "lebih bagus dari polaroid manapun.",
    author: "Dimas P.",
    detail: "thermemo sesi #0014",
    receipt: TESTIMONIALS[1],
  },
  {
    quote: "kertasnya tipis. kenangannya tidak.",
    author: "Ara S.",
    detail: "thermemo sesi #0007",
    receipt: TESTIMONIALS[2],
  },
  {
    quote: "masih kusimpan di dompet, tujuh bulan kemudian.",
    author: "Rania K.",
    detail: "thermemo sesi #0021",
    receipt: TESTIMONIALS[0],
  },
  {
    quote: "lebih bagus dari polaroid manapun.",
    author: "Dimas P.",
    detail: "thermemo sesi #0014",
    receipt: TESTIMONIALS[1],
  },
  {
    quote: "kertasnya tipis. kenangannya tidak.",
    author: "Ara S.",
    detail: "thermemo sesi #0007",
    receipt: TESTIMONIALS[2],
  },
];

export const TestimonialsSection = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Yang mereka bawa pulang.
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              bukan review. ini kata-kata di balik struk yang masih tersimpan.
            </p>
            <Button variant="outline" className="shadow-md" asChild>
              <Link href="/gallery">
                Lihat gallery <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {testimonialsData.map((t, index) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="relative h-[288px] lg:h-[328px] flex items-center justify-center bg-muted">
                          <ReceiptCard
                            date={t.receipt.date}
                            num={t.receipt.num}
                            cat={t.receipt.cat}
                            cap={t.receipt.cap}
                            side={t.receipt.side}
                            tone={t.receipt.tone}
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-10 p-6">
                          <blockquote className="font-display text-lg leading-none! font-medium md:text-xl lg:text-2xl">
                            {t.quote}
                          </blockquote>
                          <div className="space-y-0.5">
                            <div className="text-primary font-semibold">{t.author}</div>
                            <div className="text-muted-foreground text-sm">{t.detail}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
