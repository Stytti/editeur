import {type RefObject} from "react";

interface TimelineProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    duration: number;
    currentTime: number;
    currentTimeChange: (time: number) => void;
}

export function Timeline({ videoRef, duration, currentTime, currentTimeChange }: TimelineProps) {

    const formatTime = (seconds: number) => {
        if (!Number.isFinite(seconds)) return "00:00";

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleSeek = (value: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = value;
        currentTimeChange(value);
    };

    return (
      <div>
          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={(event) =>
              handleSeek(Number(event.target.value))
            }
            disabled={!duration}
          />

          <span>{formatTime(duration)}</span>

      </div>
    )
}