"use client";

import type { FrameTemplate } from "@/lib/frames";
import type { FrameStyle } from "@/lib/data";
import type { StampPlacement } from "@/components/photobooth/stamp-layer";
import { STAMPS } from "@/lib/stamps";

const SCALE = 3;

function isDark(cls: string) {
  return cls === "dark" || cls === "ghost";
}

function getStyleBg(cls: string): { bg: string; fg: string } {
  if (cls === "dark" || cls === "ghost") return { bg: "#111111", fg: "#F7F4EE" };
  if (cls === "paper") return { bg: "#EFEADF", fg: "#111111" };
  if (cls === "archive") return { bg: "#e8e3d8", fg: "#111111" };
  return { bg: "#FFFFFF", fg: "#111111" };
}

function drawDashedLine(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  color: string,
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.stroke();
  ctx.restore();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!iw || !ih) return;
  const scale = Math.max(w / iw, h / ih);
  const sw = iw * scale;
  const sh = ih * scale;
  const sx = x + (w - sw) / 2;
  const sy = y + (h - sh) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  ctx.drawImage(img, sx, sy, sw, sh);
  ctx.restore();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export interface DrawReceiptOptions {
  template: FrameTemplate;
  frameStyle: FrameStyle;
  photos: (string | null)[];
  stamps: StampPlacement[];
  caption: string;
  showDate: boolean;
  showNum: boolean;
  date: string;
  time: string;
  session: string;
}

export async function drawReceiptToCanvas(
  opts: DrawReceiptOptions,
): Promise<HTMLCanvasElement> {
  const { template, frameStyle, photos, stamps, caption, showDate, showNum, date, time, session } = opts;
  const baseW = 320;
  const cls = frameStyle.cls;
  const { bg, fg } = getStyleBg(cls);
  const accent = isDark(cls) ? "#9a7c6e" : "#553125";

  const padding = baseW * 0.06;
  const fontSize = {
    brand: baseW * 0.056,
    sub: baseW * 0.025,
    meta: baseW * 0.025,
    caption: baseW * 0.056,
    seal: baseW * 0.04,
    tagline: baseW * 0.028,
    side: baseW * 0.034,
  };

  const cap = (caption || "a small moment.").slice(0, 24);

  const [rw, rh] = template.areaRatio.split("/").map(Number);
  const areaRatioNum = rw && rh ? rw / rh : 0.75;
  const photoH = (baseW - padding * 2) * areaRatioNum;
  let totalH = padding * 1.2 + fontSize.brand + padding * 0.4;
  totalH += fontSize.sub + padding + padding;
  if (showDate) totalH += fontSize.meta + padding * 0.6;
  totalH += photoH;
  totalH += fontSize.caption + padding * 0.5 + padding * 0.6;
  totalH += fontSize.meta + padding;
  totalH += fontSize.tagline + padding;
  totalH += padding * 2;

  const canvas = document.createElement("canvas");
  canvas.width = baseW * SCALE;
  canvas.height = totalH * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, baseW, totalH);

  let y = padding * 1.2;

  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.font = `bold ${fontSize.brand}px sans-serif`;
  ctx.fillText("thermemo", baseW / 2, y + fontSize.brand);
  y += fontSize.brand + padding * 0.4;

  ctx.globalAlpha = 0.6;
  ctx.font = `${fontSize.sub}px sans-serif`;
  ctx.letterSpacing = "0.3em";
  ctx.fillText("記ノ片 · ki no kata", baseW / 2, y + fontSize.sub);
  ctx.globalAlpha = 1;
  y += fontSize.sub + padding;

  ctx.strokeStyle = fg;
  ctx.globalAlpha = 0.3;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(baseW - padding, y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.globalAlpha = 1;
  y += padding;

  if (showDate) {
    ctx.globalAlpha = 0.85;
    ctx.font = `600 ${fontSize.meta}px sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(`DATE · ${date}`, padding, y + fontSize.meta);
    ctx.textAlign = "right";
    ctx.fillText(`TIME · ${time}`, baseW - padding, y + fontSize.meta);
    ctx.textAlign = "center";
    ctx.globalAlpha = 1;
    y += fontSize.meta + padding * 0.6;
  }

  const photoAreaX = padding;
  const photoAreaW = baseW - padding * 2;
  const photoAreaY = y;

  for (let i = 0; i < template.slots.length; i++) {
    const slot = template.slots[i];
    const photo = photos[i];
    const sx = photoAreaX + (slot.x / 100) * photoAreaW;
    const sy = photoAreaY + (slot.y / 100) * photoH;
    const sw = (slot.w / 100) * photoAreaW;
    const sh = (slot.h / 100) * photoH;

    if (i > 0 && template.separator && template.separator !== "none" && slot.y > 0 && slot.x === 0) {
      const sepY = photoAreaY + ((slot.y - 1.5) / 100) * photoH;
      ctx.strokeStyle = isDark(cls) ? "rgba(220,216,209,0.3)" : "rgba(17,17,17,0.3)";
      ctx.lineWidth = 1;
      if (template.separator === "dashed") {
        ctx.setLineDash([4, 4]);
      } else {
        ctx.setLineDash([]);
      }
      ctx.beginPath();
      ctx.moveTo(photoAreaX, sepY);
      ctx.lineTo(photoAreaX + photoAreaW, sepY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    if (photo) {
      try {
        const img = await loadImage(photo);
        drawImageCover(ctx, img, sx, sy, sw, sh);
      } catch {
        ctx.fillStyle = isDark(cls) ? "#2a2622" : "#DCD8D1";
        ctx.fillRect(sx, sy, sw, sh);
      }
    } else {
      ctx.fillStyle = isDark(cls) ? "#2a2622" : "#DCD8D1";
      ctx.fillRect(sx, sy, sw, sh);
    }
  }

  y += photoH;

  for (const sp of stamps) {
    const stamp = STAMPS.find((s) => s.id === sp.stampId);
    if (!stamp) continue;
    const stX = padding + (sp.x / 100) * (baseW - padding * 2);
    const stY = padding * 1.2 + (sp.y / 100) * totalH;
    const stSize = (sp.size / 100) * baseW;

    ctx.save();
    ctx.translate(stX, stY);
    ctx.rotate((sp.rotation * Math.PI) / 180);
    ctx.globalAlpha = 0.85;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = stamp.svg;
    const svgEl = tempDiv.querySelector("svg");
    if (svgEl) {
      const svgStr = new XMLSerializer().serializeToString(svgEl);
      const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      try {
        const stampImg = await loadImage(url);
        ctx.drawImage(stampImg, -stSize / 2, -stSize / 2, stSize, stSize);
      } catch {
        // skip broken stamp
      }
      URL.revokeObjectURL(url);
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  y += padding * 0.5;

  ctx.fillStyle = accent;
  ctx.font = `italic ${fontSize.caption}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(cap, baseW / 2, y + fontSize.caption);
  y += fontSize.caption + padding * 0.6;

  drawDashedLine(ctx, padding, y, baseW - padding * 2, fg + "80");
  y += padding * 0.2;

  ctx.fillStyle = fg;
  ctx.font = `${fontSize.meta}px sans-serif`;
  ctx.textAlign = "left";
  if (showNum) ctx.fillText(`NO. ${session}`, padding, y + fontSize.meta);

  const sealR = baseW * 0.055;
  const sealCx = baseW - padding - sealR;
  const sealCy = y + sealR + 2;
  ctx.beginPath();
  ctx.arc(sealCx, sealCy, sealR, 0, Math.PI * 2);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = accent;
  ctx.font = `${fontSize.seal}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("記片", sealCx, sealCy);
  ctx.textBaseline = "alphabetic";
  y += fontSize.meta + padding;

  ctx.fillStyle = fg;
  ctx.globalAlpha = 0.7;
  ctx.font = `500 ${fontSize.tagline}px sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText("proof that this moment happened.", baseW / 2, y + fontSize.tagline);
  ctx.globalAlpha = 1;

  ctx.save();
  ctx.fillStyle = accent;
  ctx.font = `${fontSize.side}px sans-serif`;
  ctx.translate(baseW + 8, totalH / 2);
  ctx.rotate(Math.PI / 2);
  ctx.textAlign = "center";
  ctx.fillText("記ノ片 · KI NO KATA", 0, 0);
  ctx.restore();

  return canvas;
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    },
    "image/png",
    1.0,
  );
}
