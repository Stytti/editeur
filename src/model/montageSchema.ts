import {z} from "zod";

export const ALIGN = ["left", "center", "right"] as const;
export type Align = typeof ALIGN[number];

export const EFFECT_TYPES = ["zoomPunch", "zoomIn", "zoomOut", "shake", "shakeZoom", "pulse"] as const;
export const ENTRANCE_TYPES = ["fade", "typewriter", "bounce", "slide"] as const;
export const EXIT_TYPES = ["fade", "slideRight", "slideDown"] as const;

export const COLOR_REGEX = /^#[0-9a-fA-F]{6}$/;

// Une étape d'animation d'entrée
export const AnimationInSchema = z.object({
  type: z.enum(ENTRANCE_TYPES),
  durationMs: z.number()
});

// Une étape d'animation de sortie
export const AnimationOutSchema = z.object({
  type: z.enum(EXIT_TYPES),
  durationMs: z.number()
});

// Animation complète
export const AnimationSchema = z.object({
  in: AnimationInSchema.nullable(),
  out: AnimationOutSchema.nullable(),
  ghost: z.boolean()
});

export const EffectSchema = z.object({
  type: z.enum(EFFECT_TYPES),
  strength: z.number().min(0).max(1)
});

export const TitleSchema = z.object({
  id: z.string(),
  text: z.string(),

  startTime: z.number(),
  endTime: z.number(),

  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),

  fontId: z.string(),
  fontSize: z.number(),

  color: z.string().regex(COLOR_REGEX),
  strokeColor: z.string().regex(COLOR_REGEX),
  strokeWidth: z.number(),
  shinyWidth: z.number(),

  backgroundColor: z.string().regex(COLOR_REGEX).nullable(),

  align: z.enum(ALIGN),

  effect: EffectSchema.nullable(),

  animation: AnimationSchema.nullable()
});

export const MontageSchema = z.object({
  duration: z.number(),
  titles: z.array(TitleSchema)
});

export type Montage = z.infer<typeof MontageSchema>;
export type TitleItem = z.infer<typeof TitleSchema>;
export type Effect = z.infer<typeof EffectSchema>;
export type Animation = z.infer<typeof AnimationSchema>;