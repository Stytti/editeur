import './Preview.css';
import {useRef, useState} from "react";
import {VideoPlayer} from "./VideoPlayer/VideoPlayer.tsx";
import {Timeline} from "../Timeline/Timeline.tsx";
import {Button} from "../../components/Button/Button.tsx";
import {VideoTitle} from "./VideoTitle/VideoTitle.tsx";
import type {TitleItem} from "../../types/TitleItem.ts";

interface PreviewProps {
  videoSrc: string;
  titles: TitleItem[]
}

export function Preview({videoSrc, titles}: PreviewProps) {
  const ref = useRef(null);
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
      <div ref={ref} className='frame'>
        <div className='frame__video'>
          <VideoPlayer src={videoSrc} videoRef={videoRef} handleLoadedMetadata={handleLoadedMetadata} handleTimeUpdate={handleTimeUpdate} />
        </div>
        <VideoTitle ref={ref} currentTime={currentTime} titles={titles} />
      </div>
      <div className='flex-row gap-3 align-items-center'>
        <Button className='play-button' text={isPlaying ? "Pause" : "Play"} onButtonClick={handlePlayPause} />
        <Timeline duration={duration} currentTime={currentTime} currentTimeChange={setCurrentTime} videoRef={videoRef} />
      </div>
    </>
  );
}