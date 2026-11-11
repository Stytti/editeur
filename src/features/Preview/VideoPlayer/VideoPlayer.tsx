import {type RefObject} from "react";

export interface VideoPlayerProps {
    src: string;
    videoRef: RefObject<HTMLVideoElement | null>;
    handleTimeUpdate: () => void;
    onPlayingChange: (isPlaying: boolean) => void;
}

export function VideoPlayer({ src, videoRef, handleTimeUpdate, onPlayingChange }: VideoPlayerProps) {
    // Fichiers servis depuis public/media/ (ignoré par git, voir README).
    const getMediaUrl = (videoId: string) => `/media/${videoId}.mp4`;

    const onTimeUpdate = () => {
        if (!videoRef.current) return;
        handleTimeUpdate();
    }

    return (
        <video ref={videoRef} src={getMediaUrl(src)}
               onTimeUpdate={onTimeUpdate}
               onPlay={() => onPlayingChange(true)}
               onPause={() => onPlayingChange(false)}
               onEnded={() => onPlayingChange(false)}
               className="frame__video-element" />
    );
}
