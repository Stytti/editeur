import './Preview.css';
import {useRef, useState} from "react";
import {VideoPlayer} from "./VideoPlayer/VideoPlayer.tsx";
import {Timeline} from "../Timeline/Timeline.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {IconPause, IconPlay} from "../../components/Icons/Icons.tsx";
import {TitleLayers} from "./VideoTitle/TitleLayers.tsx";
import type {TitleItem} from "../../model/montageSchema.ts";

interface PreviewProps {
  videoSrc: string;
  titles: TitleItem[];
  duration: number;
  selectedId: string|null;
  onSelect: (id: string) => void;
  onTitleChange: (updatedTitle: TitleItem) => void;
}

export function Preview({videoSrc, titles, duration, selectedId, onSelect, onTitleChange}: PreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement|null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Données de la vidéo
  const [currentTime, setCurrentTime] = useState(0);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // La durée du montage vient du JSON, pas de la vidéo
    if (video.currentTime >= duration) {
      video.pause();
      video.currentTime = duration;
    }
    setCurrentTime(Math.min(video.currentTime, duration));
  }

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <>
      <div ref={frameRef} className='frame'>
        <div className='frame__video'>
          <VideoPlayer src={videoSrc} videoRef={videoRef} handleTimeUpdate={handleTimeUpdate}
                       onPlayingChange={setIsPlaying} />
        </div>
        <TitleLayers frameRef={frameRef} currentTime={currentTime} titles={titles}
                     onSelect={onSelect} onTitleChange={onTitleChange} selectedId={selectedId} />
      </div>
      <div className='flex-row gap-3 align-items-center'>
        <Button className='play-button' aria-label={isPlaying ? "Pause" : "Lecture"} onButtonClick={handlePlayPause}>
          {isPlaying ? <IconPause/> : <IconPlay/>}
        </Button>
        <Timeline duration={duration} currentTime={currentTime} currentTimeChange={setCurrentTime} videoRef={videoRef} />
      </div>
    </>
  );
}