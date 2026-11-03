import type {TitleItem} from "../../../types/TitleItem.ts";
import './VideoTitle.css';
import type {RefObject} from "react";

interface VideoTitleProps {
  ref: RefObject<null>;
  currentTime: number;
  titles: TitleItem[]
}

export function VideoTitle({ ref, currentTime, titles }: VideoTitleProps ) {

  function shouldDisplayTitle(title: TitleItem): boolean {
    return title.startTime <= currentTime && title.endTime >= currentTime;
  }

  return (
    <div className='title-layers'>
      {titles.map((title) => (
        shouldDisplayTitle(title) && (
          <div
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
              fontFamily: title.fontId
            }}
          >
            {title.text}
          </div>
      )))}
    </div>
  );
}
