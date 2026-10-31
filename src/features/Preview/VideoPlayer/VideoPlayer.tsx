import {type RefObject} from "react";

export interface VideoPlayerProps {
    src: string;
    videoRef: RefObject<HTMLVideoElement> | null;
    handleLoadedMetadata: () => void;
    handleTimeUpdate: () => void;
}

export function VideoPlayer({ src, videoRef, handleLoadedMetadata, handleTimeUpdate }: VideoPlayerProps) {
    const getMediaUrl = (value: string) => {
        return 'media/' + value + '.mp4';
    }

    const onLoadedMetadata = () => {
        if (!videoRef?.current) return;
        handleLoadedMetadata();
    }

    const onTimeUpdate = () => {
        if (!videoRef?.current) return;
        handleTimeUpdate();
    }

    return (
        <video ref={videoRef} src={getMediaUrl(src)}
               onLoadedMetadata={onLoadedMetadata}
               onTimeUpdate={onTimeUpdate}
               width={640} />
    );
}