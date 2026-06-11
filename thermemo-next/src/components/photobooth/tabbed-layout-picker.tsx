"use client";

import { FRAME_TEMPLATES, type FrameTemplate } from "@/lib/frames";
import { cn } from "@/lib/utils";

interface TabbedLayoutPickerProps {
  selected: string;
  onSelect: (template: FrameTemplate) => void;
}

export function TabbedLayoutPicker({
  selected,
  onSelect,
}: TabbedLayoutPickerProps) {
  const templates = FRAME_TEMPLATES.filter((t) => t.category === "template");
  const classics = FRAME_TEMPLATES.filter((t) => t.category === "classic");

  return (
    <div>
      <div className="mb-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-4">
          classic strips
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {classics.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isSelected={selected === t.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 pt-6" style={{ borderTop: "1px dashed var(--border)" }}>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-4">
          creative templates
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {templates.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              isSelected={selected === t.id}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  isSelected,
  onSelect,
}: {
  template: FrameTemplate;
  isSelected: boolean;
  onSelect: (t: FrameTemplate) => void;
}) {
  const isDark = template.cls === "dark" || template.cls === "ghost";
  const isCedar = template.cls === "cedar";
  const isPaper = template.cls === "paper";
  const isArchive = template.cls === "archive";

  const bgStyle: React.CSSProperties = isDark
    ? { background: "#111", color: "#F7F4EE" }
    : isPaper
      ? { background: "#EFEADF" }
      : isArchive
        ? { background: "#e8e3d8" }
        : { background: "#fff" };

  const borderStyle: React.CSSProperties = isCedar
    ? { border: "1.5px solid #553125" }
    : isDark
      ? { border: "1px solid #333" }
      : { border: "1px solid var(--border)" };

  const slotBg = isDark
    ? "rgba(220,216,209,0.15)"
    : "linear-gradient(135deg, #d4cfc6 0%, #9b9690 100%)";

  return (
    <button
      onClick={() => onSelect(template)}
      className={cn(
        "bg-card text-left p-3 transition-all duration-200 group",
        isSelected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-receipt"
          : "hover:ring-1 hover:ring-border hover:shadow-receipt",
      )}
      style={{ borderRadius: 2 }}
    >
      <div
        className="relative w-full overflow-hidden mb-3"
        style={{
          aspectRatio: "3/4",
          ...bgStyle,
          ...borderStyle,
          borderRadius: 1,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 px-2 py-1 flex justify-between text-[7px] tracking-[0.2em] uppercase font-semibold opacity-70"
          style={{ borderBottom: "0.5px dashed currentColor" }}
        >
          <span>thermemo</span>
          <span>·</span>
        </div>

        <div
          className="absolute inset-0 pt-5 pb-8 px-2"
          style={{ aspectRatio: template.areaRatio }}
        >
          <div className="relative w-full h-full">
            {template.slots.map((slot, i) => (
              <div
                key={i}
                className="absolute overflow-hidden"
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: `${slot.w}%`,
                  height: `${slot.h}%`,
                  background: slotBg,
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 px-2 py-1 flex justify-between items-center text-[7px] tracking-[0.15em] uppercase opacity-60"
          style={{ borderTop: "0.5px dashed currentColor" }}
        >
          <span>NO.0042</span>
          <span
            style={{
              fontFamily: "var(--font-jp)",
              fontSize: "8px",
              color: isDark ? "#9a7c6e" : "#553125",
            }}
          >
            記片
          </span>
        </div>
      </div>

      <div className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-0.5">
        {template.name}
      </div>
      <div className="text-[9px] text-muted-foreground tracking-[0.05em]">
        {template.sub} · {template.photoCount} photo
        {template.photoCount > 1 ? "s" : ""}
      </div>
    </button>
  );
}
