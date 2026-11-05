import './Preview.css';
import {useRef, useState} from "react";
import {VideoPlayer} from "./VideoPlayer/VideoPlayer.tsx";
import {Timeline} from "../Timeline/Timeline.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {VideoTitle} from "./VideoTitle/VideoTitle.tsx";
import type {TitleItem} from "../../model/montageSchema.ts";

interface PreviewProps {
  videoSrc: string;
  titles: TitleItem[];
  onSelect: (id: string) => void;
  onTitleChange: (updatedTitle: TitleItem) => void;
}

export function Preview({videoSrc, titles, onSelect, onTitleChange}: PreviewProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement|null>(null);

  // Etat de lecture de la vidéo
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Données de la vidéo
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(0);

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <>
      <div ref={frameRef} className='frame'>
        <div className='frame__video'>
          <VideoPlayer src={videoSrc} videoRef={videoRef} handleLoadedMetadata={handleLoadedMetadata} handleTimeUpdate={handleTimeUpdate} />
        </div>
        <VideoTitle frameRef={frameRef} currentTime={currentTime} titles={titles}
                    onSelect={onSelect} onTitleChange={onTitleChange} />
      </div>
      <div className='flex-row gap-3 align-items-center'>
        <Button className='play-button' text={isPlaying ? "Pause" : "Play"} onButtonClick={handlePlayPause} />
        <Timeline duration={duration} currentTime={currentTime} currentTimeChange={setCurrentTime} videoRef={videoRef} />
      </div>
    </>
  );
}