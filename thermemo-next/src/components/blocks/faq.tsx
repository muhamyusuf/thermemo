import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/data";

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Ada pertanyaan?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Ada pertanyaan?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              Kalau tidak ketemu jawabannya,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                hubungi kami langsung
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {FAQS.map((group, groupIndex) => (
              <div key={group.group}>
                <h3 className="text-muted-foreground border-b py-4">{group.group}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {group.items.map((item, i) => (
                    <AccordionItem key={i} value={`${groupIndex}-${i}`}>
                      <AccordionTrigger>{item.q}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
