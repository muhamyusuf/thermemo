const PREFIX = "thermemo_";

interface BoothPersist {
  selectedFrameId: string;
  selectedFilter: string;
  caption: string;
  showDate: boolean;
  showNum: boolean;
  square: boolean;
}

function key(k: string) {
  return PREFIX + k;
}

export function saveBoothState(state: Partial<BoothPersist>): void {
  try {
    const existing = loadBoothState();
    const merged = { ...existing, ...state };
    localStorage.setItem(key("state"), JSON.stringify(merged));
  } catch {
    // storage full or unavailable
  }
}

export function loadBoothState(): Partial<BoothPersist> {
  try {
    const raw = localStorage.getItem(key("state"));
    if (!raw) return {};
    return JSON.parse(raw) as Partial<BoothPersist>;
  } catch {
    return {};
  }
}

export function clearBoothState(): void {
  try {
    localStorage.removeItem(key("state"));
    localStorage.removeItem(key("photos"));
  } catch {
    // ignore
  }
}

export function saveBoothPhotos(photos: (string | null)[]): void {
  try {
    const compressed = photos.map((p) => {
      if (!p) return null;
      if (p.length > 500_000) return compressDataUrl(p);
      return p;
    });
    localStorage.setItem(key("photos"), JSON.stringify(compressed));
  } catch {
    // storage full
  }
}

export function loadBoothPhotos(): (string | null)[] {
  try {
    const raw = localStorage.getItem(key("photos"));
    if (!raw) return [];
    return JSON.parse(raw) as (string | null)[];
  } catch {
    return [];
  }
}

function compressDataUrl(dataUrl: string): string {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    const img = new Image();
    img.src = dataUrl;
    const maxW = 600;
    const ratio = maxW / img.width;
    canvas.width = maxW;
    canvas.height = img.height * ratio;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.7);
  } catch {
    return dataUrl;
  }
}
