"use client";

import type { FrameTemplate } from "@/lib/frames";
import type { FrameStyle } from "@/lib/data";
import type { StampPlacement } from "./stamp-layer";
import { STAMPS } from "@/lib/stamps";

export interface ReceiptRendererProps {
  template: FrameTemplate;
  frameStyle: FrameStyle;
  photos: (string | null)[];
  filterCss: string;
  stamps: StampPlacement[];
  caption: string;
  showDate: boolean;
  showNum: boolean;
  square: boolean;
  date: string;
  time: string;
  session: string;
  width?: number;
  id?: string;
}

const STYLE_BG: Record<string, React.CSSProperties> = {
  dark: { background: "#111", color: "#F7F4EE" },
  ghost: { background: "#111", color: "#F7F4EE" },
  paper: { background: "#EFEADF" },
  archive: { background: "#e8e3d8" },
};

const STYLE_BORDER: Record<string, React.CSSProperties> = {
  cedar: { border: "1.5px solid #553125" },
  dark: { border: "1px solid #111" },
  ghost: { border: "1.5px solid #553125" },
};

function isDark(cls: string) {
  return cls === "dark" || cls === "ghost";
}

export function ReceiptRenderer({
  template,
  frameStyle,
  photos,
  filterCss,
  stamps,
  caption,
  showDate,
  showNum,
  square,
  date,
  time,
  session,
  width = 320,
  id,
}: ReceiptRendererProps) {
  const cls = frameStyle.cls;
  const bg = STYLE_BG[cls] ?? { background: "#fff", color: "#111111" };
  const border = STYLE_BORDER[cls] ?? { border: "1px solid #DCD8D1" };
  const accent = isDark(cls) ? "#9a7c6e" : "#553125";
  const cap = (caption || "a small moment.").slice(0, 24);

  const padding = width * 0.06;
  const fontSize = {
    brand: width * 0.056,
    sub: width * 0.025,
    meta: width * 0.025,
    caption: width * 0.056,
    seal: width * 0.04,
    tagline: width * 0.028,
    side: width * 0.034,
  };

  return (
    <div
      id={id}
      className="relative select-none"
      style={{
        width,
        ...bg,
        ...border,
        fontFamily: "var(--font-sans)",
        paddingBottom: padding,
      }}
    >
      <div
        className="font-bold text-center lowercase"
        style={{
          fontSize: fontSize.brand,
          letterSpacing: "-0.02em",
          paddingTop: padding * 1.2,
          paddingBottom: padding * 0.4,
          fontFamily: "var(--font-display)",
        }}
      >
        thermemo
      </div>

      <div
        className="text-center uppercase opacity-60"
        style={{
          fontSize: fontSize.sub,
          letterSpacing: "0.3em",
          paddingBottom: padding,
          marginBottom: padding,
          borderBottom: "1px dashed currentColor",
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        記ノ片 · ki no kata
      </div>

      {showDate && (
        <div
          className="flex justify-between uppercase font-semibold"
          style={{
            fontSize: fontSize.meta,
            letterSpacing: "0.2em",
            paddingLeft: padding,
            paddingRight: padding,
            paddingBottom: padding * 0.6,
            opacity: 0.85,
          }}
        >
          <span>DATE · {date}</span>
          <span>TIME · {time}</span>
        </div>
      )}

      <div
        className="relative"
        style={{
          aspectRatio: template.areaRatio,
          marginLeft: padding,
          marginRight: padding,
        }}
      >
        {template.slots.map((slot, i) => {
          const photo = photos[i];
          const showSeparator =
            i > 0 &&
            template.separator &&
            template.separator !== "none" &&
            slot.y > 0 &&
            slot.x === 0;

          return (
            <div key={i}>
              {showSeparator && (
                <div
                  className="absolute left-0 right-0"
                  style={{
                    top: `${slot.y - 1.5}%`,
                    height: "1px",
                    background:
                      template.separator === "dashed"
                        ? isDark(cls)
                          ? "rgba(220,216,209,0.3)"
                          : "rgba(17,17,17,0.3)"
                        : isDark(cls)
                          ? "rgba(220,216,209,0.5)"
                          : "rgba(17,17,17,0.5)",
                    ...(template.separator === "dashed" && {
                      backgroundImage: isDark(cls)
                        ? "repeating-linear-gradient(90deg, rgba(220,216,209,0.3) 0 4px, transparent 4px 8px)"
                        : "repeating-linear-gradient(90deg, rgba(17,17,17,0.3) 0 4px, transparent 4px 8px)",
                      background: "none",
                    }),
                  }}
                />
              )}
              <div
                className="absolute overflow-hidden"
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: `${slot.w}%`,
                  height: `${slot.h}%`,
                }}
              >
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photo}
                    alt={`photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      filter: filterCss,
                      aspectRatio: square ? "1/1" : undefined,
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      background: isDark(cls)
                        ? "#2a2622"
                        : "repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,0.05) 6px 7px), #DCD8D1",
                    }}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {stamps.length > 0 && (
        <div
          className="pointer-events-none"
          style={{
            position: "absolute",
            inset: 0,
          }}
        >
          {stamps.map((sp) => {
            const stamp = STAMPS.find((s) => s.id === sp.stampId);
            if (!stamp) return null;
            return (
              <div
                key={sp.id}
                style={{
                  position: "absolute",
                  left: `${sp.x}%`,
                  top: `${sp.y}%`,
                  width: `${sp.size}%`,
                  transform: `translate(-50%, -50%) rotate(${sp.rotation}deg)`,
                  color: stamp.color,
                  opacity: 0.85,
                }}
                dangerouslySetInnerHTML={{ __html: stamp.svg }}
              />
            );
          })}
        </div>
      )}

      <div
        className="text-center italic"
        style={{
          fontSize: fontSize.caption,
          paddingTop: padding * 0.5,
          paddingBottom: padding * 0.6,
          minHeight: width * 0.08,
          fontFamily: "var(--font-accent)",
          color: accent,
          paddingLeft: padding,
          paddingRight: padding,
        }}
      >
        {cap}
      </div>

      <div
        style={{
          borderTop: "1px dashed currentColor",
          opacity: 0.5,
          marginLeft: padding,
          marginRight: padding,
          marginBottom: padding * 0.2,
        }}
      />

      <div
        className="flex justify-between items-end uppercase"
        style={{
          fontSize: fontSize.meta,
          letterSpacing: "0.22em",
          paddingLeft: padding,
          paddingRight: padding,
          paddingTop: padding * 0.4,
          paddingBottom: padding,
        }}
      >
        <span>{showNum ? `NO. ${session}` : ""}</span>
        <div
          className="flex items-center justify-center"
          style={{
            width: width * 0.11,
            height: width * 0.11,
            borderRadius: "50%",
            border: `1px solid ${accent}`,
            color: accent,
            fontSize: fontSize.seal,
            fontFamily: "var(--font-jp)",
          }}
        >
          記片
        </div>
      </div>

      <div
        className="text-center uppercase font-medium opacity-70"
        style={{
          fontSize: fontSize.tagline,
          letterSpacing: "0.3em",
          paddingBottom: padding,
        }}
      >
        proof that this moment happened.
      </div>

      <div
        className="absolute whitespace-nowrap"
        style={{
          right: -width * 0.05,
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontSize: fontSize.side,
          letterSpacing: "0.15em",
          fontFamily: "var(--font-jp)",
          color: accent,
        }}
      >
        記ノ片 · KI NO KATA
      </div>
    </div>
  );
}
