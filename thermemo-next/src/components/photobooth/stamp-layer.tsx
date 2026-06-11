"use client";

import { useState, useRef, useCallback } from "react";
import { STAMPS } from "@/lib/stamps";
import { Button } from "@/components/ui/button";

export interface StampPlacement {
  id: string;
  stampId: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

interface StampLayerProps {
  stamps: StampPlacement[];
  onChange: (stamps: StampPlacement[]) => void;
  receiptWidth: number;
}

export function StampLayer({ stamps, onChange, receiptWidth }: StampLayerProps) {
  const [activeStamp, setActiveStamp] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    id: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const addStamp = useCallback(
    (stampId: string) => {
      if (stamps.length >= 5) return;
      const stamp = STAMPS.find((s) => s.id === stampId);
      if (!stamp) return;
      const placement: StampPlacement = {
        id: `stamp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        stampId,
        x: 50,
        y: 50,
        size: stamp.defaultSize,
        rotation: 0,
      };
      onChange([...stamps, placement]);
      setActiveStamp(placement.id);
    },
    [stamps, onChange],
  );

  const removeStamp = useCallback(
    (id: string) => {
      onChange(stamps.filter((s) => s.id !== id));
      if (activeStamp === id) setActiveStamp(null);
    },
    [stamps, onChange, activeStamp],
  );

  const updateStamp = useCallback(
    (id: string, updates: Partial<StampPlacement>) => {
      onChange(stamps.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    },
    [stamps, onChange],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent, stampId: string) => {
      e.preventDefault();
      e.stopPropagation();
      const stamp = stamps.find((s) => s.id === stampId);
      if (!stamp || !containerRef.current) return;
      setActiveStamp(stampId);
      dragRef.current = {
        id: stampId,
        startX: e.clientX,
        startY: e.clientY,
        origX: stamp.x,
        origY: stamp.y,
      };
      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);
    },
    [stamps],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
      const dy = ((e.clientY - dragRef.current.startY) / rect.height) * 100;
      const newX = Math.max(5, Math.min(95, dragRef.current.origX + dx));
      const newY = Math.max(5, Math.min(95, dragRef.current.origY + dy));
      updateStamp(dragRef.current.id, { x: newX, y: newY });
    },
    [updateStamp],
  );

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const rotateStamp = useCallback(
    (id: string) => {
      const stamp = stamps.find((s) => s.id === id);
      if (!stamp) return;
      updateStamp(id, { rotation: (stamp.rotation + 45) % 360 });
    },
    [stamps, updateStamp],
  );

  const resizeStamp = useCallback(
    (id: string, delta: number) => {
      const stamp = stamps.find((s) => s.id === id);
      if (!stamp) return;
      const newSize = Math.max(5, Math.min(40, stamp.size + delta));
      updateStamp(id, { size: newSize });
    },
    [stamps, updateStamp],
  );

  return (
    <div>
      <div className="mb-3">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          add stamps · max 5
        </p>
        <div className="flex flex-wrap gap-2">
          {STAMPS.map((stamp) => (
            <button
              key={stamp.id}
              onClick={() => addStamp(stamp.id)}
              disabled={stamps.length >= 5}
              className="flex items-center gap-1.5 border bg-card px-2.5 py-1.5 text-[10px] tracking-[0.1em] uppercase font-medium transition-colors hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ borderRadius: 2 }}
            >
              <span
                className="w-4 h-4 flex-shrink-0"
                style={{ color: stamp.color }}
                dangerouslySetInnerHTML={{ __html: stamp.svg }}
              />
              <span className="hidden sm:inline">{stamp.name}</span>
            </button>
          ))}
        </div>
      </div>

      {stamps.length > 0 && (
        <div
          ref={containerRef}
          className="relative cursor-crosshair"
          style={{
            width: receiptWidth,
            aspectRatio: "3/4",
            margin: "0 auto",
          }}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {stamps.map((sp) => {
            const stamp = STAMPS.find((s) => s.id === sp.stampId);
            if (!stamp) return null;
            const isActive = activeStamp === sp.id;
            return (
              <div
                key={sp.id}
                className="absolute cursor-grab active:cursor-grabbing"
                style={{
                  left: `${sp.x}%`,
                  top: `${sp.y}%`,
                  width: `${sp.size}%`,
                  transform: `translate(-50%, -50%) rotate(${sp.rotation}deg)`,
                  color: stamp.color,
                  outline: isActive ? "1px dashed #553125" : "none",
                  outlineOffset: 2,
                  touchAction: "none",
                }}
                onPointerDown={(e) => onPointerDown(e, sp.id)}
              >
                <div dangerouslySetInnerHTML={{ __html: stamp.svg }} />
              </div>
            );
          })}
        </div>
      )}

      {activeStamp && (
        <div className="flex items-center justify-center gap-2 mt-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => resizeStamp(activeStamp, -2)}
          >
            −
          </Button>
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            size
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => resizeStamp(activeStamp, 2)}
          >
            +
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => rotateStamp(activeStamp)}
          >
            ↻ 45°
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => removeStamp(activeStamp)}
            className="text-destructive"
          >
            × remove
          </Button>
        </div>
      )}
    </div>
  );
}
