'use client';

import { GripHorizontal, Palette } from 'lucide-react';
import { PointerEvent, useState } from 'react';

type ThemePickerProps = {
  colors: readonly string[];
  value: string;
  onChange: (color: string) => void;
};

export function ThemePicker({ colors, value, onChange }: ThemePickerProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 96 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; left: number; top: number } | null>(null);

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragStart({ x: event.clientX, y: event.clientY, left: position.x, top: position.y });
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!dragStart) return;
    const nextX = Math.min(Math.max(12, dragStart.left + event.clientX - dragStart.x), window.innerWidth - 64);
    const nextY = Math.min(Math.max(72, dragStart.top + event.clientY - dragStart.y), window.innerHeight - 96);
    setPosition({ x: nextX, y: nextY });
  }

  function onPointerUp() {
    setDragStart(null);
  }

  return (
    <div
      className="fixed z-40 hidden items-center gap-2 sm:flex"
      style={{ left: position.x, top: position.y }}
    >
      <button
        type="button"
        aria-label={open ? 'Collapse theme picker' : 'Open theme picker'}
        title={open ? 'Collapse theme picker' : 'Open theme picker'}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gray-900/75 text-white shadow-lg backdrop-blur-sm"
        onClick={() => setOpen((current) => !current)}
      >
        <Palette size={17} />
      </button>

      {open ? (
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-gray-900/75 p-2 shadow-lg backdrop-blur-sm">
          <button
            type="button"
            aria-label="Drag theme picker"
            title="Drag theme picker"
            className="flex h-7 w-7 cursor-grab items-center justify-center rounded-full text-gray-400 active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <GripHorizontal size={16} />
          </button>
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              aria-label={`Change avatar clothing color to ${color}`}
              className="h-5 w-5 rounded-full border transition-transform hover:scale-110"
              style={{
                backgroundColor: color,
                borderColor: value === color ? '#f9fafb' : 'rgba(255,255,255,0.22)'
              }}
              onClick={() => onChange(color)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
