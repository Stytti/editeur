import type {Animation} from "../model/montageSchema.ts";
import {clamp} from "../geometry/clamp.ts";
import {IDENTITY, transform, type Transform} from "./transform.ts";

type EntranceType = NonNullable<Animation["in"]>["type"];
type ExitType = NonNullable<Animation["out"]>["type"];

/**
 * Progression d'une animation, de 0 (début) à 1 (fini).
 * `elapsed` en secondes, `durationMs` en millisecondes (comme dans le JSON).
 */
export function animationProgress(elapsed: number, durationMs: number): number {
  if (durationMs <= 0) return 1;
  return clamp(elapsed / (durationMs / 1000), 0, 1);
}

/** Easing « easeOutBack » : monte, dépasse un peu 1, puis revient à 1 → effet rebond. */
export function easeOutBack(p: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * (p - 1) ** 3 + c1 * (p - 1) ** 2;
}

/**
 * Entrée : p va de 0 (le titre vient d'apparaître) à 1 (entrée finie).
 * typewriter ne transforme rien : il agit sur le nombre de lettres (voir visibleCharsFor).
 */
const ENTRANCES: Record<EntranceType, (p: number) => Transform> = {
  fade: (p) => transform({opacity: p}),
  bounce: (p) => transform({scale: easeOutBack(p)}),
  slide: (p) => transform({translateY: (1 - p) * 10, opacity: p}),
  typewriter: () => IDENTITY,
};

/**
 * Sortie : p va de 1 (la sortie commence) à 0 (le titre disparaît).
 * Même logique que l'entrée, jouée « à l'envers » à partir de la fin du titre.
 */
const EXITS: Record<ExitType, (p: number) => Transform> = {
  fade: (p) => transform({opacity: p}),
  slideRight: (p) => transform({translateX: (1 - p) * 60, opacity: p}),
  slideDown: (p) => transform({translateY: (1 - p) * 30, opacity: p}),
};

/** Ghost : flottement doux et continu de haut en bas (amplitude 1 % de frame, période 2 s). */
export function ghost(local: number): Transform {
  return transform({translateY: Math.sin((2 * Math.PI * local) / 2)});
}

/**
 * Animation complète à un instant.
 * `local` = temps depuis le début du titre, `remaining` = temps avant sa fin (en s).
 */
export function sampleAnimation(animation: Animation | null, local: number, remaining: number): Transform[] {
  if (!animation) return [];
  const parts: Transform[] = [];
  if (animation.in) parts.push(ENTRANCES[animation.in.type](animationProgress(local, animation.in.durationMs)));
  if (animation.out) parts.push(EXITS[animation.out.type](animationProgress(remaining, animation.out.durationMs)));
  if (animation.ghost) parts.push(ghost(local));
  return parts;
}

/** Nombre de lettres visibles (typewriter) ; le texte entier sinon. */
export function visibleCharsFor(animation: Animation | null, text: string, local: number): number {
  if (animation?.in?.type !== "typewriter") return text.length;
  return Math.floor(animationProgress(local, animation.in.durationMs) * text.length);
}
