import type {TitleItem} from "../../../types/TitleItem.ts";
import './VideoTitle.css';

interface VideoTitleProps {
  currentTime: number;
  titles: TitleItem[]
}

export function VideoTitle({ currentTime, titles }: VideoTitleProps ) {

  function shouldDisplayTitle(title: TitleItem): boolean {
    return title.startTime <= currentTime && title.endTime >= currentTime;
  }

  return (
    <div className='title-layer'>
      {titles.map((title) => (
        shouldDisplayTitle(title) && (
          <div
            className='title-layer__text'
            key={title.id}
            style={{
              left: `${title.x}%`,
              top: `${title.y}%`,
              width: `${title.width}%`,
              height: `${title.height}%`,
              fontSize: `${title.fontSize}px`,
              color: title.color,
              textShadow: `0 0 ${title.shinyWidth}px ${title.strokeColor}`,
              textAlign: title.align,
            }}
          >
            {title.text}
          </div>
      )))}
    </div>
  );
}
