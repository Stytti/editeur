import {useRef, useState} from "react";
import {VideoScrubber} from "./VideoScrubber.tsx";

import "./video-player.css";

export interface VideoPlayerProps {
    src: string;
    className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Etat de lecture de la vidéo
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Données de la vidéo
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(0);


    const getMediaUrl = (value: string) => {
        return 'media/' + value + '.mp4';
    }

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
        <div className={className}>
            <div className="video-container">
                <video ref={videoRef} src={getMediaUrl(src)}
                       onLoadedMetadata={handleLoadedMetadata}
                       onTimeUpdate={handleTimeUpdate}
                       width={640} />

                <div className="action-buttons">
                    <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
                    <button onClick={() => videoRef.current?.load()}>Reload</button>
                </div>

                <VideoScrubber videoRef={videoRef} duration={duration}
                               currentTime={currentTime} currentTimeChange={setCurrentTime} />
            </div>
        </div>
    );
}