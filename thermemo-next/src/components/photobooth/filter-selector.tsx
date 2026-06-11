"use client";

import { PHOTO_FILTERS } from "@/lib/filters";
import { cn } from "@/lib/utils";

interface FilterSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
  previewImage?: string | null;
}

export function FilterSelector({
  selected,
  onSelect,
  previewImage,
}: FilterSelectorProps) {
  return (
    <div>
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
        photo filter
      </p>
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollSnapType: "x mandatory" }}>
        {PHOTO_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => onSelect(f.id)}
            className={cn(
              "flex-shrink-0 w-[72px] text-center transition-all duration-200",
              selected === f.id
                ? "ring-1 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100",
            )}
            style={{ scrollSnapAlign: "start", borderRadius: 2 }}
          >
            <div
              className="w-full aspect-square mb-1.5 overflow-hidden border border-border"
              style={{ borderRadius: 2 }}
            >
              {previewImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewImage}
                  alt={f.name}
                  className="w-full h-full object-cover"
                  style={{ filter: f.css }}
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    filter: f.css,
                    background:
                      "linear-gradient(135deg, #b0aba2 0%, #3b3631 100%)",
                  }}
                />
              )}
            </div>
            <div className="text-[9px] tracking-[0.15em] uppercase font-semibold">
              {f.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
