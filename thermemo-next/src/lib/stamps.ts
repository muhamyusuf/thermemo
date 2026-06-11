export interface Stamp {
  id: string;
  name: string;
  svg: string;
  category: "seal" | "kanji" | "receipt" | "decoration";
  defaultSize: number;
  color: string;
}

export const STAMPS: Stamp[] = [
  {
    id: "seal-kinokata",
    name: "記ノ片 Seal",
    category: "seal",
    defaultSize: 18,
    color: "#553125",
    svg: `<svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="28" stroke="currentColor" stroke-width="1.5"/><text x="30" y="36" text-anchor="middle" font-size="16" font-family="serif" fill="currentColor">記片</text></svg>`,
  },
  {
    id: "seal-ki",
    name: "記 Stamp",
    category: "seal",
    defaultSize: 14,
    color: "#553125",
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="36" height="36" stroke="currentColor" stroke-width="1.5"/><text x="20" y="28" text-anchor="middle" font-size="20" font-family="serif" fill="currentColor">記</text></svg>`,
  },
  {
    id: "seal-kata",
    name: "片 Stamp",
    category: "seal",
    defaultSize: 14,
    color: "#553125",
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="36" height="36" stroke="currentColor" stroke-width="1.5"/><text x="20" y="28" text-anchor="middle" font-size="20" font-family="serif" fill="currentColor">片</text></svg>`,
  },
  {
    id: "kanji-memory",
    name: "思ヒ出",
    category: "kanji",
    defaultSize: 16,
    color: "#553125",
    svg: `<svg viewBox="0 0 50 24" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="25" y="18" text-anchor="middle" font-size="14" font-family="serif" fill="currentColor">思ヒ出</text></svg>`,
  },
  {
    id: "kanji-proof",
    name: "証明",
    category: "kanji",
    defaultSize: 14,
    color: "#111111",
    svg: `<svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="20" y="18" text-anchor="middle" font-size="14" font-family="serif" fill="currentColor">証明</text></svg>`,
  },
  {
    id: "kanji-moment",
    name: "瞬間",
    category: "kanji",
    defaultSize: 14,
    color: "#111111",
    svg: `<svg viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="20" y="18" text-anchor="middle" font-size="14" font-family="serif" fill="currentColor">瞬間</text></svg>`,
  },
  {
    id: "receipt-perf",
    name: "Perforation",
    category: "decoration",
    defaultSize: 80,
    color: "#B8B2A9",
    svg: `<svg viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="4" x2="200" y2="4" stroke="currentColor" stroke-width="1" stroke-dasharray="4 4"/></svg>`,
  },
  {
    id: "receipt-barcode",
    name: "Barcode",
    category: "receipt",
    defaultSize: 30,
    color: "#111111",
    svg: `<svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="2" height="24" fill="currentColor"/><rect x="4" y="0" width="1" height="24" fill="currentColor"/><rect x="7" y="0" width="3" height="24" fill="currentColor"/><rect x="12" y="0" width="1" height="24" fill="currentColor"/><rect x="15" y="0" width="2" height="24" fill="currentColor"/><rect x="19" y="0" width="1" height="24" fill="currentColor"/><rect x="22" y="0" width="3" height="24" fill="currentColor"/><rect x="27" y="0" width="1" height="24" fill="currentColor"/><rect x="30" y="0" width="2" height="24" fill="currentColor"/><rect x="34" y="0" width="1" height="24" fill="currentColor"/><rect x="37" y="0" width="2" height="24" fill="currentColor"/><rect x="41" y="0" width="3" height="24" fill="currentColor"/><rect x="46" y="0" width="1" height="24" fill="currentColor"/><rect x="49" y="0" width="2" height="24" fill="currentColor"/><rect x="53" y="0" width="1" height="24" fill="currentColor"/><rect x="56" y="0" width="3" height="24" fill="currentColor"/><rect x="61" y="0" width="1" height="24" fill="currentColor"/><rect x="64" y="0" width="2" height="24" fill="currentColor"/><rect x="68" y="0" width="1" height="24" fill="currentColor"/><rect x="71" y="0" width="3" height="24" fill="currentColor"/><rect x="76" y="0" width="2" height="24" fill="currentColor"/><text x="40" y="30" text-anchor="middle" font-size="5" font-family="monospace" fill="currentColor">MEM-2026-0042</text></svg>`,
  },
  {
    id: "receipt-qr",
    name: "QR Mark",
    category: "receipt",
    defaultSize: 12,
    color: "#111111",
    svg: `<svg viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="30" height="30" stroke="currentColor" stroke-width="1"/><rect x="3" y="3" width="8" height="8" fill="currentColor"/><rect x="19" y="3" width="8" height="8" fill="currentColor"/><rect x="3" y="19" width="8" height="8" fill="currentColor"/><rect x="13" y="13" width="4" height="4" fill="currentColor"/><rect x="19" y="19" width="3" height="3" fill="currentColor"/><rect x="24" y="19" width="3" height="3" fill="currentColor"/><rect x="19" y="24" width="3" height="3" fill="currentColor"/><rect x="24" y="24" width="3" height="3" fill="currentColor"/><rect x="14" y="3" width="2" height="2" fill="currentColor"/><rect x="14" y="7" width="2" height="2" fill="currentColor"/></svg>`,
  },
  {
    id: "stamp-approved",
    name: "APPROVED",
    category: "receipt",
    defaultSize: 22,
    color: "#553125",
    svg: `<svg viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="78" height="28" rx="2" stroke="currentColor" stroke-width="1.5"/><text x="40" y="20" text-anchor="middle" font-size="11" font-family="sans-serif" font-weight="bold" letter-spacing="3" fill="currentColor">APPROVED</text></svg>`,
  },
  {
    id: "stamp-date",
    name: "Date Stamp",
    category: "receipt",
    defaultSize: 20,
    color: "#111111",
    svg: `<svg viewBox="0 0 70 20" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="35" y="14" text-anchor="middle" font-size="9" font-family="monospace" letter-spacing="1" fill="currentColor">2026.06.11</text><line x1="0" y1="18" x2="70" y2="18" stroke="currentColor" stroke-width="0.5"/></svg>`,
  },
];

export function getStampById(id: string): Stamp | undefined {
  return STAMPS.find((s) => s.id === id);
}

export function getStampsByCategory(
  category: Stamp["category"],
): Stamp[] {
  return STAMPS.filter((s) => s.category === category);
}
