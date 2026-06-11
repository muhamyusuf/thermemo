# thermemo — PRD: Photobooth Feature Improvement Plan

> *Proof that this moment happened.*
>
> **Status:** Draft · June 2026
> **Scope:** thermemo-next (Next.js 15) — primary target
> **Reference:** polaroidbooth.com (crawled June 2026)

---

## 1. Executive Summary

PRD ini mendokumentasikan improvement plan untuk thermemo photobooth agar fungsionalitasnya setara dengan polaroidbooth.com, namun tetap mempertahankan identitas brand thermemo: **thermal receipt aesthetic, monochrome, intimate, collectible, 記ノ片**.

Polaroidbooth adalah web photobooth yang mature dengan frame template system yang kaya, sticker/decoration layer, community scrapbook, dan blog content yang masif (40+ artikel). Thermemo sudah memiliki fondasi yang solid (5-step wizard, 6 frame designs, camera capture, receipt download) namun perlu peningkatan signifikan di beberapa area kunci.

**Prinsip utama:** Setiap improvement harus melewati filter brand DNA thermemo. Apa yang "playful & colorful" di Polaroid menjadi "quiet & archival" di Thermemo. Apa yang "sticker" di Polaroid menjadi "stamp/seal" di Thermemo.

---

## 2. Current State Analysis

### 2.1 What Thermemo Already Has (thermemo-next)

| Feature | Status | File |
|---|---|---|
| 5-step wizard (Layout → Frame → Capture → Preview → Download) | ✅ Done | `src/app/photobooth/page.tsx` |
| 6 frame designs (Classic, Ki, Dark, Paper, Archive, Ghost) | ✅ Done | `src/lib/data.ts` |
| 4 layout options (1-4 photos) | ✅ Done | `src/lib/data.ts` |
| Camera capture + grayscale filter | ✅ Done | `photobooth/page.tsx:261` |
| Upload fallback | ✅ Done | `photobooth/page.tsx:327` |
| Timer 3s + flip camera | ✅ Done | `photobooth/page.tsx:286` |
| Receipt preview (live) | ✅ Done | `photobooth/page.tsx:37` |
| Download via html2canvas | ✅ Done | `photobooth/page.tsx:356` |
| Customization (caption, date, number, square crop) | ✅ Done | `photobooth/page.tsx:808` |
| Instagram tag copy | ✅ Done | `photobooth/page.tsx:378` |
| Community wall (placeholder) | ⚠️ Static | `blocks/community-wall.tsx` |
| Blog (6 articles) | ⚠️ Minimal | `src/lib/data.ts` |
| SEO landing pages | ✅ Done | `online-photobooth/`, `receipt-photobooth/`, etc. |
| Analytics (GA4 + Clarity) | ✅ Done | `layout.tsx` |
| Booking system | ✅ Done | `src/app/booking/` |
| Floating pill navbar (glassmorphism) | ✅ Done | `blocks/navbar.tsx` |

### 2.2 What Polaroidbooth Has That Thermemo Doesn't

| Feature | Polaroid | Thermemo Equivalent | Gap |
|---|---|---|---|
| **Frame template system** (8+ templates with multi-slot layouts) | ✅ Rich | ❌ Only 6 flat frame styles | **HIGH** |
| **Percentage-based slot positioning** `{x, y, w, h}` | ✅ Yes | ❌ Only vertical stack | **HIGH** |
| **Tabs: Frame Templates vs Classic Layouts** | ✅ Yes | ❌ Single list | **MEDIUM** |
| **Carousel + thumbnail strip** for frame preview | ✅ Yes | ❌ Horizontal scroll only | **MEDIUM** |
| **Filter system** (darkroom, vintage, etc.) | ✅ Yes | ❌ Only grayscale | **HIGH** |
| **Sticker/decoration layer** with drag-and-drop | ✅ Yes | ❌ None | **HIGH** |
| **Premium frames** with unlock mechanism | ✅ Yes (disabled) | ❌ None | **LOW** |
| **Floating decorative elements** on homepage | ✅ Yes (sun, bow, star) | ❌ None | **MEDIUM** |
| **Interactive microcopy** ("drag me!", "100% free xoxo") | ✅ Yes | ❌ None | **LOW** |
| **Community Scrapbook** with Instagram feature mechanic | ✅ Yes | ⚠️ Static placeholder | **HIGH** |
| **Blog content** (40+ SEO articles) | ✅ 40+ | ⚠️ 6 articles | **MEDIUM** |
| **localStorage persistence** | ✅ Yes | ❌ None | **MEDIUM** |
| **Web Share API** integration | ✅ Likely | ❌ Manual copy tag | **LOW** |

---

## 3. Feature Improvement Plan

### Phase 1: Frame Template System (HIGH PRIORITY)

**Goal:** Mengganti flat frame list dengan template system yang mendukung multiple layout configurations per frame, menggunakan percentage-based slot positioning.

#### 3.1 New Frame Data Architecture

**File:** `src/lib/frames.ts` (new)

```typescript
export interface FrameSlot {
  x: number;    // percentage 0-100
  y: number;    // percentage 0-100
  w: number;    // percentage width
  h: number;    // percentage height
}

export interface FrameTemplate {
  id: string;
  name: string;
  sub: string;
  cls: string;
  slots: FrameSlot[];
  photoCount: number;
  category: 'template' | 'classic';
  premium?: boolean;
  defaultFilter?: string;
}
```

**Proposed templates (thermemo-themed):**

| ID | Name | Slots | Category | Description |
|---|---|---|---|---|
| `receipt-single` | Single Receipt | 1 | classic | 1 photo, full receipt frame |
| `receipt-duo` | Twin Receipt | 2 | classic | 2 photos stacked vertically |
| `receipt-trio` | Triple Receipt | 3 | classic | 3 photos, standard strip |
| `receipt-quad` | Classic Strip | 4 | classic | 4 photos, the iconic strip |
| `receipt-six` | Archive Grid | 6 | template | 2x3 grid layout |
| `ki-duo` | 記ノ片 Duo | 2 | template | Cedar accent, 2 photos side-by-side |
| `ki-trio` | 記ノ片 Trio | 3 | template | Cedar accent, asymmetric layout |
| `dark-quad` | Dark Strip | 4 | template | Black paper, 4 photos |
| `archive-collage` | Archive Collage | 4 | template | Mixed sizes, aged stone look |
| `ghost-strip` | Ghost Strip | 3 | template | Dark + seal, 3 photos |
| `paper-duo` | Paper Grain Duo | 2 | template | Rice texture, paired |
| `thermal-filmstrip` | Thermal Filmstrip | 3 | template | Film perforation edges |

#### 3.2 Layout Picker with Tabs

**File:** `src/app/photobooth/page.tsx` (modify Step 1 & Step 2)

Replace current single-step layout + frame selection with tabbed interface:

- **Tab 1: "Receipt Templates"** — Pre-designed multi-slot layouts (archive-collage, ki-trio, etc.)
- **Tab 2: "Classic Layouts"** — Simple 1/2/3/4 photo strips

Each template shown as a visual card with slot preview (percentage-based wireframe).

#### 3.3 Canvas-based Receipt Renderer

**File:** `src/components/photobooth/receipt-renderer.tsx` (new)

Replace current HTML-based `ReceiptPreview` with a canvas/SVG renderer that:
- Positions photos using percentage-based `{x, y, w, h}` slots
- Applies frame-specific backgrounds, borders, and decorations
- Supports filter pipeline (grayscale, sepia, high-contrast, darkroom)
- Renders kanji seals, dashed lines, metadata stamps

---

### Phase 2: Filter System (HIGH PRIORITY)

**Goal:** Memberikan user pilihan filter untuk foto mereka, tetap dalam batas brand (monochrome-centric).

#### 3.4 Available Filters

| ID | Name | CSS Filter | Description |
|---|---|---|---|
| `thermal` | Thermal (default) | `grayscale(100%) contrast(1.05)` | Standard thermemo look |
| `darkroom` | Darkroom | `grayscale(100%) contrast(1.4) brightness(0.85)` | High contrast dark |
| `faded` | Faded Ink | `grayscale(100%) contrast(0.8) brightness(1.15) opacity(0.9)` | Worn thermal paper |
| `sepia` | Warm Sepia | `sepia(60%) grayscale(40%) contrast(1.1)` | Warm tone, slight color |
| `highkey` | High Key | `grayscale(100%) brightness(1.3) contrast(0.9)` | Overexposed, dreamy |
| `ink` | Ink Press | `grayscale(100%) contrast(1.8) brightness(0.7)` | Very high contrast, stamp-like |

**Implementation:**
- Filter selector in Step 3 (Capture) or Step 4 (Preview)
- Apply via CSS `filter` on video preview (real-time) and canvas capture
- Store selected filter in `BoothState`
- Default filter can be set per frame template (`defaultFilter` field)

**File:** `src/lib/filters.ts` (new)

---

### Phase 3: Stamp & Seal Layer (HIGH PRIORITY)

**Goal:** Menggantikan "sticker" Polaroid dengan stamp/seal system yang sesuai brand thermemo. Bukan colorful stickers, tapi monochrome stamps, kanji seals, dan receipt-style decorations.

#### 3.5 Stamp Data

**File:** `src/lib/stamps.ts` (new)

```typescript
export interface Stamp {
  id: string;
  name: string;
  svg: string;       // inline SVG or path to SVG
  category: 'seal' | 'kanji' | 'receipt' | 'decoration';
  defaultSize: number; // percentage of receipt width
}
```

**Proposed stamps:**

| ID | Name | Category | Visual |
|---|---|---|---|
| `seal-kinokata` | 記ノ片 Seal | seal | Round cedar seal |
| `seal-ki` | 記 Stamp | seal | Single kanji stamp |
| `seal-kata` | 片 Stamp | seal | Single kanji stamp |
| `kanji-memory` | 思ヒ出 | kanji | "Memory" kanji |
| `kanji-proof` | 証明 | kanji | "Proof" kanji |
| `kanji-moment` | 瞬間 | kanji | "Moment" kanji |
| `receipt-torn` | Torn Edge | decoration | Torn paper edge overlay |
| `receipt-perf` | Perforation | decoration | Dashed perforation line |
| `receipt-barcode` | Barcode | decoration | Fake barcode graphic |
| `receipt-qr` | QR Mark | decoration | Small QR-like square |
| `stamp-date` | Date Stamp | receipt | Date stamp overlay |
| `stamp-approved` | APPROVED | receipt | "APPROVED" stamp mark |

#### 3.6 Drag-and-Drop Stamp Placement

**File:** `src/components/photobooth/stamp-layer.tsx` (new)

- Stamps rendered as absolutely-positioned SVGs over the receipt preview
- Drag to reposition (percentage-based coordinates)
- Pinch/scroll to resize
- Tap to rotate (45-degree increments)
- Stamp selection panel in Step 4 (Preview/Customize)
- Max 5 stamps per receipt (keep it minimal)

**Brand constraint:** Stamps are monochrome only (cedar brown or ink black). No color. No emoji.

---

### Phase 4: Homepage & Navigation Improvements (MEDIUM PRIORITY)

#### 3.7 Floating Decorative Elements

**File:** `src/components/blocks/hero.tsx` (modify)

Adapt Polaroid's floating sticker concept to thermemo's brand:

| Element | Polaroid | Thermemo Equivalent |
|---|---|---|
| Sun | ☀️ | Receipt fragment (torn paper piece) |
| Pink bow | 🎀 | 記ノ片 seal stamp |
| Pink star | ⭐ | Kanji character 記 floating |
| Red lily | 🌺 | Thermal paper curl |
| Purple flower | 🌸 | Dashed perforation line piece |

- Subtle CSS animation (float, gentle rotation)
- Draggable (optional, with "drag me" microcopy in thermemo voice: *"pindahin aku..."*)
- Low opacity, non-intrusive
- Only on desktop, hidden on mobile

#### 3.8 Enhanced "How It Works" Section

**File:** `src/components/blocks/how-it-works.tsx` (modify)

Add visual receipt strip animation showing the process:
1. Camera icon → receipt paper emerging
2. Filter/stamp icons → receipt with photos appearing
3. Download icon → completed receipt with torn edge

Use the signature thermal-print reveal animation (lines appearing top-to-bottom).

#### 3.9 Interactive Process Strip

**File:** New component in hero or standalone

Replace current static process strip with animated version:
```
📷 Open your camera → ✨ Apply filters & stamps → 💾 Download your receipt
```
Adapted to thermemo voice:
```
▢ buka kamera → 記 pilih frame & stamp → ⬇ download struk kamu
```

---

### Phase 5: Community Scrapbook (HIGH PRIORITY)

**Goal:** Mengganti static community wall dengan interactive scrapbook yang memiliki feature mechanic jelas.

#### 3.10 Community Scrapbook Feature

**File:** `src/components/blocks/community-wall.tsx` (rewrite)

**Mechanic (adapted from Polaroid):**
1. User takes photo in booth → downloads receipt
2. Share on Instagram → tag @thermemo.id #thermemo
3. thermemo team reviews → features on scrapbook wall

**Implementation:**
- **Phase A (MVP):** Curated gallery with real Instagram embeds / manually uploaded receipt images
- **Phase B:** Instagram Basic Display API integration to auto-pull tagged posts
- **Phase C:** User submission form (upload receipt + Instagram handle)

**Visual:**
- Grid of receipt cards with slight rotation (scrapbook feel)
- Each card shows: receipt image, Instagram handle, date
- "Get featured" CTA with clear steps
- Masonry/Pinterest-style layout

#### 3.11 Share Flow Improvement

**File:** `src/app/photobooth/page.tsx` (modify Step 5)

- Add Web Share API support (native share sheet on mobile)
- Generate shareable image with thermemo branding + Instagram tag watermark
- One-tap "Share to Instagram Stories" (opens Instagram with image pre-loaded)
- Copy tag button with toast notification

---

### Phase 6: Blog & Content Expansion (MEDIUM PRIORITY)

**Goal:** Expand blog dari 6 ke 20+ artikel untuk SEO dan content marketing.

#### 3.12 Blog Content Plan

**Adapted from Polaroid's blog strategy, themed for thermemo:**

| Category | Article Ideas |
|---|---|
| **Memory & Nostalgia** | Kenapa struk bisa jadi kenangan terbaik, The quiet magic of monochrome, Why physical photos matter more than digital, Nobody looks at old photos — here's the fix |
| **Tips & How-To** | 5 cara menyimpan receipt photobooth, Photo composition rules for photobooth, Photo booth lighting guide, How to pose for photobooth (solo/couple/group) |
| **Behind the Brand** | 記ノ片: makna di balik simbol thermemo, Behind the paper: how thermal printing works, The story behind our receipt design |
| **Event & Occasion** | Photo booth ideas for birthday parties, Wedding receipt guestbook ideas, Graduation photo strip ideas, Event photobooth without hiring a company |
| **Photography** | Polaroid vs digital: which feels more real, Disposable camera revival, Why film feels more real, Photo editing mistakes you're making |
| **Culture** | How social media killed the photo album, The real reason people cry at old photos, AI-generated photos vs real photography |

**Technical:**
- Migrate blog from hardcoded data to MDX/Markdown files
- Each article as a Next.js page with proper SEO metadata
- Blog listing page with category filter
- Reading time estimation
- Related articles section

**File structure:**
```
src/content/blog/
  kenapa-struk-kenangan.mdx
  behind-paper.mdx
  ...
src/app/blog/[slug]/page.tsx
```

---

### Phase 7: Technical Improvements (MEDIUM PRIORITY)

#### 3.13 localStorage Persistence

**File:** `src/lib/booth-storage.ts` (new)

```typescript
const STORAGE_KEYS = {
  selectedLayout: 'thermemo_layout',
  selectedFrameId: 'thermemo_frame',
  selectedFilter: 'thermemo_filter',
  boothPhotos: 'thermemo_photos',
  boothCaption: 'thermemo_caption',
};
```

- Save user selections at each step
- Restore on page refresh / accidental navigation
- Clear on "Take another" reset
- Photos stored as dataURLs (size warning if > 5MB total)

#### 3.14 Improved Download Pipeline

**File:** `src/lib/receipt-export.ts` (new)

- Replace html2canvas with canvas-native rendering for better quality
- Support multiple export formats:
  - PNG (default, high quality)
  - JPEG (smaller file size)
  - PDF (for printing)
- Proper resolution: 2x for screen, 300dpi for print
- Include proper metadata in file (EXIF: date, session number)

#### 3.15 Performance Optimization

- Lazy-load camera module (only when Step 3 is reached)
- Web Worker for canvas image processing (grayscale filter)
- Image compression before localStorage (resize to max 800px width)
- Preload frame template SVGs

#### 3.16 Accessibility

- Keyboard navigation for all booth steps
- Screen reader announcements for step transitions
- Focus management between steps
- ARIA labels for camera controls
- High contrast mode support
- Reduced motion preference respect

---

## 4. Implementation Roadmap

### Sprint 1 (Week 1-2): Frame Template System
- [ ] Define `FrameTemplate` data structure in `src/lib/frames.ts`
- [ ] Create 12 frame templates with slot positioning
- [ ] Implement tabbed layout picker (Templates vs Classic)
- [ ] Build canvas-based receipt renderer with percentage slots
- [ ] Migrate existing 6 frames to new data structure

### Sprint 2 (Week 3-4): Filter System + Stamp Layer
- [ ] Implement filter pipeline in `src/lib/filters.ts`
- [ ] Add filter selector UI in Step 3/4
- [ ] Create stamp SVG assets (12 stamps)
- [ ] Build drag-and-drop stamp layer component
- [ ] Integrate stamps into receipt renderer

### Sprint 3 (Week 5-6): Community Scrapbook + Share Flow
- [ ] Redesign community wall as interactive scrapbook
- [ ] Implement Web Share API
- [ ] Add Instagram story share flow
- [ ] Create submission form for community features
- [ ] Curate initial 20+ community receipt images

### Sprint 4 (Week 7-8): Homepage + Blog Expansion
- [ ] Add floating decorative elements to hero
- [ ] Enhance "How It Works" with receipt animation
- [ ] Migrate blog to MDX
- [ ] Write 10 new blog articles
- [ ] Implement blog category filter and search

### Sprint 5 (Week 9-10): Technical Polish
- [ ] localStorage persistence
- [ ] Canvas-native export pipeline
- [ ] Performance optimization (lazy loading, web worker)
- [ ] Accessibility audit and fixes
- [ ] Cross-browser testing (Safari, Firefox, Chrome, mobile)

---

## 5. Brand Compliance Checklist

Every feature must pass these checks before shipping:

- [ ] Brand wordmark is **always lowercase**: `thermemo`
- [ ] Tagline is **verbatim**: *Proof that this moment happened.*
- [ ] No emoji in marketing copy or UI labels
- [ ] No gradients, no color photography
- [ ] Max two font families per layout
- [ ] Cedar Brown (#553125) is accent only, never background fill
- [ ] 55/30/10/5 color ratio (Rice Paper / Ink Black / Cedar / Stone)
- [ ] Monochrome-only output (grayscale, sepia allowed; no full color)
- [ ] Tone: reflective, soft-spoken, memory-led
- [ ] No buzzwords: revolutionary, game-changer, next-level, etc.
- [ ] Stamps are monochrome (cedar or ink black), never colorful
- [ ] Receipt aesthetic preserved in all output formats

---

## 6. Success Metrics

| Metric | Current | Target (3 months) |
|---|---|---|
| Photobooth sessions started | baseline | +50% |
| Completion rate (Step 1 → Step 5) | baseline | +20% |
| Downloads per session | baseline | +30% |
| Instagram tags (@thermemo.id) | baseline | +100% |
| Blog organic traffic | baseline | +200% |
| Average time on photobooth page | baseline | +25% |
| Bounce rate on /photobooth | baseline | -15% |
| Community wall submissions | 0 | 50+ |

---

## 7. Open Questions

1. **Premium frames:** Apakah thermemo perlu premium/paid frames? Polaroid punya `premium: true` tapi unlock-nya disabled. Untuk thermemo, ini bisa jadi monetization path atau cukup semua gratis?

2. **Backend requirement:** Community scrapbook phase B (Instagram API) butuh backend. Apakah thermemo siap dengan backend, atau tetap client-side only?

3. **Physical booth integration:** Apakah photobooth web app perlu sync dengan physical booth (e.g., QR code di struk fisik → buka digital copy di web)?

4. **Multi-language:** Blog saat ini campur ID/EN. Apakah perlu full bilingual atau pilih satu bahasa utama?

5. **PWA:** Apakah thermemo photobooth perlu jadi PWA (installable, offline-capable) untuk experience yang lebih app-like?

---

## 8. File Change Summary

### New Files
| Path | Purpose |
|---|---|
| `src/lib/frames.ts` | Frame template data with slot positioning |
| `src/lib/filters.ts` | Filter definitions and CSS filter strings |
| `src/lib/stamps.ts` | Stamp/seal SVG data |
| `src/lib/booth-storage.ts` | localStorage persistence helpers |
| `src/lib/receipt-export.ts` | Canvas-native export pipeline |
| `src/components/photobooth/receipt-renderer.tsx` | Canvas/SVG receipt renderer |
| `src/components/photobooth/stamp-layer.tsx` | Drag-and-drop stamp overlay |
| `src/components/photobooth/filter-selector.tsx` | Filter picker UI |
| `src/components/photobooth/tabbed-layout-picker.tsx` | Tabs: Templates vs Classic |
| `src/content/blog/*.mdx` | Blog articles (20+) |

### Modified Files
| Path | Changes |
|---|---|
| `src/app/photobooth/page.tsx` | Tabbed picker, filter UI, stamp layer, share flow |
| `src/lib/data.ts` | Migrate frames to new FrameTemplate structure |
| `src/components/blocks/hero.tsx` | Floating decorative elements |
| `src/components/blocks/how-it-works.tsx` | Receipt animation |
| `src/components/blocks/community-wall.tsx` | Interactive scrapbook rewrite |
| `src/app/blog/[slug]/page.tsx` | MDX blog post renderer |
| `src/styles/globals.css` | New utility classes for stamps, filters |

---

*記ノ片 · ki no kata · fragment of memory*
