export interface PhotoFilter {
  id: string;
  name: string;
  css: string;
  description: string;
}

export const PHOTO_FILTERS: PhotoFilter[] = [
  {
    id: "thermal",
    name: "Thermal",
    css: "grayscale(100%) contrast(1.05)",
    description: "standard thermemo look",
  },
  {
    id: "darkroom",
    name: "Darkroom",
    css: "grayscale(100%) contrast(1.4) brightness(0.85)",
    description: "high contrast dark",
  },
  {
    id: "faded",
    name: "Faded Ink",
    css: "grayscale(100%) contrast(0.8) brightness(1.15)",
    description: "worn thermal paper",
  },
  {
    id: "sepia",
    name: "Warm Sepia",
    css: "sepia(60%) grayscale(40%) contrast(1.1)",
    description: "warm tone, slight color",
  },
  {
    id: "highkey",
    name: "High Key",
    css: "grayscale(100%) brightness(1.3) contrast(0.9)",
    description: "overexposed, dreamy",
  },
  {
    id: "ink",
    name: "Ink Press",
    css: "grayscale(100%) contrast(1.8) brightness(0.7)",
    description: "stamp-like, very bold",
  },
];

export function getFilterById(id: string): PhotoFilter | undefined {
  return PHOTO_FILTERS.find((f) => f.id === id);
}

export function getFilterCss(id: string): string {
  return getFilterById(id)?.css ?? PHOTO_FILTERS[0].css;
}
