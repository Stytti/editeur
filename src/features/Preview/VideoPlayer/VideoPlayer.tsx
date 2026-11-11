import {type RefObject} from "react";

export interface VideoPlayerProps {
    src: string;
    videoRef: RefObject<HTMLVideoElement | null>;
    handleTimeUpdate: () => void;
    onPlayingChange: (isPlaying: boolean) => void;
}

export function VideoPlayer({ src, videoRef, handleTimeUpdate, onPlayingChange }: VideoPlayerProps) {
    const getMediaUrl = (value: string) => {
        return 'media/' + value + '.mp4';
    }

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
               width={640} />
    );
}
