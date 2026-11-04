import type {TitleItem} from "../../../types/TitleItem.ts";
import './VideoTitle.css';
import {type PointerEvent, type RefObject, useRef} from "react";
import {FONTS} from "../../../types/Constant.ts";

interface VideoTitleProps {
  frameRef: RefObject<HTMLDivElement | null>;
  currentTime: number;
  titles: TitleItem[];
  onSelect: (id: string) => void;
  onTitleChange: (updatedTitle: TitleItem) => void;
}

// Ce qu'on retient au début d'un glisser : le titre tel qu'il était + la position de la souris.
interface DragStart {
  title: TitleItem;
  mouseX: number;
  mouseY: number;
}

function shouldDisplayTitle(title: TitleItem, currentTime: number): boolean {
  return title.startTime <= currentTime && title.endTime >= currentTime;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function VideoTitle({ frameRef, currentTime, titles, onSelect, onTitleChange }: VideoTitleProps) {
  // useRef et pas useState : ces infos ne s'affichent pas, inutile de re-rendre quand elles changent.
  const dragStart = useRef<DragStart | null>(null);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>, title: TitleItem) {
    // Capture : on continue à recevoir les mouvements même si la souris sort du titre.
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { title, mouseX: e.clientX, mouseY: e.clientY };
    onSelect(title.id);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    const frame = frameRef.current;
    if (!start || !frame) return;

    // Déplacement de la souris en px écran → converti en % de la frame (le modèle est en %).
    const rect = frame.getBoundingClientRect();
    const dxPct = ((e.clientX - start.mouseX) / rect.width) * 100;
    const dyPct = ((e.clientY - start.mouseY) / rect.height) * 100;

    onTitleChange({
      ...start.title,
      x: clamp(start.title.x + dxPct, 0, 100 - start.title.width),
      y: clamp(start.title.y + dyPct, 0, 100 - start.title.height),
    });
  }

  function handlePointerUp() {
    dragStart.current = null;
  }

  return (
    <div className='title-layers'>
      {titles.map((title: TitleItem) => (
        shouldDisplayTitle(title, currentTime) && (
          <div
            onPointerDown={(e) => handlePointerDown(e, title)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className='title-layer title-layer__text'
            key={title.id}
            style={{
              left: `${title.x}%`,
              top: `${title.y}%`,
              width: `${title.width}%`,
              height: `${title.height}%`,
              fontSize: `${title.fontSize}cqh`,
              color: title.color,
              textShadow: `0 0 ${title.shinyWidth}cqh ${title.strokeColor}`,
              textAlign: title.align,
              fontFamily: FONTS.find((f) => f.value === title.fontId)?.label
            }}
          >
            {title.text}
          </div>
      )))}
    </div>
  );
}
