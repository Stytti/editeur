export function pctToPixel(pct: number, size: number): number {
    return (pct * size) / 100;
}

export function pixelToPct(pixel: number, size: number): number {
    return (pixel * 100) / size;
}