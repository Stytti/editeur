import {type RefObject} from "react";

export interface VideoPlayerProps {
    src: string;
    videoRef: RefObject<HTMLVideoElement | null>;
    handleTimeUpdate: () => void;
}

export function VideoPlayer({ src, videoRef, handleTimeUpdate }: VideoPlayerProps) {
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
               width={640} />
    );
}