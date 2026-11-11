import './TitleLayers.css';
import {type RefObject} from "react";
import type {TitleItem} from "../../../model/montageSchema.ts";
import {shouldDisplayTitle} from "../../../model/visibility.ts";
import {TitleView} from "../TitleView/TitleView.tsx";

interface TitleLayersProps {
  frameRef: RefObject<HTMLDivElement | null>;
  currentTime: number;
  titles: TitleItem[];
  selectedId: string|null;
  onSelect: (id: string) => void;
  onTitleChange: (updatedTitle: TitleItem) => void;
}

export function TitleLayers({ frameRef, currentTime, titles, selectedId, onSelect, onTitleChange }: TitleLayersProps) {

  return (
    <div className='title-layers'>
      {titles.map((title: TitleItem) => (
        shouldDisplayTitle(title, currentTime) && (
          <TitleView
            key={title.id}
            title={title}
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
