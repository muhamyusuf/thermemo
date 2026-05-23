import { SAMPLE_RECEIPTS } from "@/lib/data";
import { ReceiptCard } from "@/components/receipt-card";

export function ReceiptSamples() {
  return (
    <section className="pb-28 lg:pb-32 overflow-hidden">
      <div className="container space-y-10 lg:space-y-16">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-balance md:text-2xl lg:text-3xl">
            fragments from the booth.
            <br className="max-md:hidden" />
            <span className="text-muted-foreground">
              setiap struk adalah bukti bahwa ini pernah terjadi.
            </span>
          </h2>
        </div>

        <div
          className="flex gap-6 overflow-x-auto pb-4"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
        >
          {SAMPLE_RECEIPTS.map((r) => (
            <div key={r.num} style={{ scrollSnapAlign: "start" }}>
              <ReceiptCard
                date={r.date}
                num={r.num}
                cat={r.cat}
                cap={r.cap}
                side={r.side}
                tone={r.tone}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
