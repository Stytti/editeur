import type {TitleItem} from "../../../model/montageSchema.ts";
import {type PointerEvent, type RefObject, useRef} from "react";
import {clamp} from "../../../geometry/clamp.ts";
import {getTitleStyle} from "./getTitleStyle.ts";

interface TitleViewProps {
  title: TitleItem,
  isSelected: boolean,
  frameRef: RefObject<HTMLDivElement | null>,
  onSelect: (id: string) => void,
  onTitleChange: (updatedTitle: TitleItem) => void
}

// Ce qu'on retient au début d'un glisser : le titre tel qu'il était + la position de la souris.
interface DragStart {
  title: TitleItem;
  mouseX: number;
  mouseY: number;
}

export function TitleView({ title, isSelected, frameRef, onSelect, onTitleChange }: TitleViewProps) {
  const dragStart = useRef<DragStart | null>(null);

  function handlePointerDown(e: PointerEvent<HTMLDivElement>, title: TitleItem) {
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
    <div
      onPointerDown={(e) => handlePointerDown(e, title)}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className='title-layer title-layer__text'
      style={getTitleStyle(title)}
    >
      {title.text}
    </div>
  );
}