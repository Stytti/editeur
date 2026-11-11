import './TitleLayers.css';
import {type PointerEvent, type RefObject} from "react";
import type {TitleItem} from "../../../model/montageSchema.ts";
import {shouldDisplayTitle} from "../../../model/visibility.ts";
import {TitleView} from "../TitleView/TitleView.tsx";

interface TitleLayersProps {
  frameRef: RefObject<HTMLDivElement | null>;
  currentTime: number;
  titles: TitleItem[];
  selectedId: string|null;
  onSelect: (id: string | null) => void;
  onTitleChange: (updatedTitle: TitleItem) => void;
}

export function TitleLayers({ frameRef, currentTime, titles, selectedId, onSelect, onTitleChange }: TitleLayersProps) {

  // Clic dans le vide de la frame → désélection.
  // target === currentTarget : le clic est sur le calque LUI-MÊME, pas sur un titre (enfant).
  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onSelect(null);
  }

  return (
    <div className='title-layers' onPointerDown={handlePointerDown}>
      {titles.map((title: TitleItem) => (
        shouldDisplayTitle(title, currentTime) && (
          <TitleView
            key={title.id}
            title={title}
            currentTime={currentTime}
            isSelected={selectedId === title.id}
            frameRef={frameRef}
            onSelect={onSelect}
            onTitleChange={onTitleChange}
          />
        )
      ))}
    </div>
  );
}
