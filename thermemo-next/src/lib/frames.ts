export interface FrameSlot {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FrameTemplate {
  id: string;
  name: string;
  sub: string;
  cls: string;
  slots: FrameSlot[];
  photoCount: number;
  category: "template" | "classic";
  defaultFilter?: string;
  areaRatio: string;
  separator?: "dashed" | "solid" | "none";
}

export const FRAME_TEMPLATES: FrameTemplate[] = [
  {
    id: "receipt-single",
    name: "Single Receipt",
    sub: "one moment, one frame",
    cls: "",
    photoCount: 1,
    category: "classic",
    areaRatio: "3/4",
    separator: "none",
    slots: [{ x: 0, y: 0, w: 100, h: 100 }],
  },
  {
    id: "receipt-duo",
    name: "Twin Receipt",
    sub: "paired moment",
    cls: "",
    photoCount: 2,
    category: "classic",
    areaRatio: "3/5",
    separator: "dashed",
    slots: [
      { x: 0, y: 0, w: 100, h: 48.5 },
      { x: 0, y: 51.5, w: 100, h: 48.5 },
    ],
  },
  {
    id: "receipt-trio",
    name: "Triple Receipt",
    sub: "short story strip",
    cls: "",
    photoCount: 3,
    category: "classic",
    areaRatio: "3/7",
    separator: "dashed",
    slots: [
      { x: 0, y: 0, w: 100, h: 32 },
      { x: 0, y: 34, w: 100, h: 32 },
      { x: 0, y: 68, w: 100, h: 32 },
    ],
  },
  {
    id: "receipt-quad",
    name: "Classic Strip",
    sub: "the iconic four",
    cls: "",
    photoCount: 4,
    category: "classic",
    areaRatio: "3/9",
    separator: "dashed",
    slots: [
      { x: 0, y: 0, w: 100, h: 24 },
      { x: 0, y: 25.33, w: 100, h: 24 },
      { x: 0, y: 50.66, w: 100, h: 24 },
      { x: 0, y: 76, w: 100, h: 24 },
    ],
  },
  {
    id: "receipt-six",
    name: "Archive Grid",
    sub: "2x3 memory grid",
    cls: "archive",
    photoCount: 6,
    category: "template",
    defaultFilter: "faded",
    areaRatio: "2/3",
    separator: "solid",
    slots: [
      { x: 0, y: 0, w: 49, h: 32 },
      { x: 51, y: 0, w: 49, h: 32 },
      { x: 0, y: 34, w: 49, h: 32 },
      { x: 51, y: 34, w: 49, h: 32 },
      { x: 0, y: 68, w: 49, h: 32 },
      { x: 51, y: 68, w: 49, h: 32 },
    ],
  },
  {
    id: "ki-duo",
    name: "記ノ片 Duo",
    sub: "cedar accent, side by side",
    cls: "cedar",
    photoCount: 2,
    category: "template",
    defaultFilter: "thermal",
    areaRatio: "3/2.5",
    separator: "none",
    slots: [
      { x: 0, y: 0, w: 48.5, h: 100 },
      { x: 51.5, y: 0, w: 48.5, h: 100 },
    ],
  },
  {
    id: "ki-trio",
    name: "記ノ片 Trio",
    sub: "asymmetric cedar layout",
    cls: "cedar",
    photoCount: 3,
    category: "template",
    defaultFilter: "thermal",
    areaRatio: "3/4",
    separator: "none",
    slots: [
      { x: 0, y: 0, w: 100, h: 48 },
      { x: 0, y: 52, w: 48.5, h: 48 },
      { x: 51.5, y: 52, w: 48.5, h: 48 },
    ],
  },
  {
    id: "dark-quad",
    name: "Dark Strip",
    sub: "black paper, four frames",
    cls: "dark",
    photoCount: 4,
    category: "template",
    defaultFilter: "darkroom",
    areaRatio: "3/9",
    separator: "solid",
    slots: [
      { x: 0, y: 0, w: 100, h: 24 },
      { x: 0, y: 25.33, w: 100, h: 24 },
      { x: 0, y: 50.66, w: 100, h: 24 },
      { x: 0, y: 76, w: 100, h: 24 },
    ],
  },
  {
    id: "archive-collage",
    name: "Archive Collage",
    sub: "mixed sizes, aged stone",
    cls: "archive",
    photoCount: 4,
    category: "template",
    defaultFilter: "faded",
    areaRatio: "3/4",
    separator: "none",
    slots: [
      { x: 0, y: 0, w: 60, h: 58 },
      { x: 62, y: 0, w: 38, h: 58 },
      { x: 0, y: 62, w: 38, h: 38 },
      { x: 40, y: 62, w: 60, h: 38 },
    ],
  },
  {
    id: "ghost-strip",
    name: "Ghost Strip",
    sub: "dark seal, three frames",
    cls: "ghost",
    photoCount: 3,
    category: "template",
    defaultFilter: "ink",
    areaRatio: "3/7",
    separator: "solid",
    slots: [
      { x: 0, y: 0, w: 100, h: 32 },
      { x: 0, y: 34, w: 100, h: 32 },
      { x: 0, y: 68, w: 100, h: 32 },
    ],
  },
  {
    id: "paper-duo",
    name: "Paper Grain Duo",
    sub: "rice texture, paired",
    cls: "paper",
    photoCount: 2,
    category: "template",
    defaultFilter: "sepia",
    areaRatio: "3/5",
    separator: "dashed",
    slots: [
      { x: 0, y: 0, w: 100, h: 48.5 },
      { x: 0, y: 51.5, w: 100, h: 48.5 },
    ],
  },
  {
    id: "thermal-filmstrip",
    name: "Thermal Filmstrip",
    sub: "perforated edges",
    cls: "",
    photoCount: 3,
    category: "template",
    defaultFilter: "thermal",
    areaRatio: "3/7",
    separator: "dashed",
    slots: [
      { x: 4, y: 0, w: 92, h: 32 },
      { x: 4, y: 34, w: 92, h: 32 },
      { x: 4, y: 68, w: 92, h: 32 },
    ],
  },
];

export function getTemplateById(id: string): FrameTemplate | undefined {
  return FRAME_TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: "template" | "classic",
): FrameTemplate[] {
  return FRAME_TEMPLATES.filter((t) => t.category === category);
}
