import {EXPORT_FRAME} from "../types/Constant.ts";

export function pctToPixel(pct: number): number {
    const total = EXPORT_FRAME.height;
    return (pct * total) / 100;
}

export function pixelToPct(pixel: number): number {
    const total = EXPORT_FRAME.height;
    return (pixel * total) / 100;
}