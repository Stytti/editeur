export const ALIGN = ["left", "center", "right"] as const;
export type Align = typeof ALIGN[number];

export const EFFECT_TYPES = ["zoomPunch", "zoomIn", "zoomOut", "shake", "shakeZoom", "pulse"] as const;
export type EffectType = typeof EFFECT_TYPES[number];

export const ENTRANCE_TYPES = ["fade", "typewriter", "bounce", "slide"] as const;
export type EntranceType = typeof ENTRANCE_TYPES[number];

export const EXIT_TYPES = ["fade", "slideRight", "slideDown"] as const;
export type ExitType = typeof EXIT_TYPES[number];

export interface Effect {
  type: EffectType;
  strength: number; // 0..1
}

export interface AnimationStep<T> {
  type: T;
  durationMs: number;
}

export interface Animation {
  in: AnimationStep<EntranceType> | null;
  out: AnimationStep<ExitType> | null;
  ghost: boolean;
}

export interface TitleItem {
  id: string;
  align: Align;
  animation: Animation | null;
  backgroundColor: string | null;
  color: string;
  effect: Effect | null;
  endTime: number;
  fontSize: number;
  fontId: string;
  height: number;
  startTime: number;
  shinyWidth: number;
  strokeColor: string;
  strokeWidth: number;
  text: string;
  width: number;
  x: number;
  y: number;
}
