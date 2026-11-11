import type {Effect} from "../model/montageSchema.ts";
import {clamp} from "../geometry/clamp.ts";
import {compose, IDENTITY, transform, type Transform} from "./transform.ts";

/**
 * Effets « d'emphase » : ils durent toute la vie du titre.
 * Tous purs : (temps local en s, force 0..1, durée du titre en s) → Transform.
 * Même entrée → même sortie, toujours (pas de Math.random) : c'est ce qui garantit
 * que l'aperçu et le rendu serveur (image par image) donnent la même chose.
 */
type EffectFn = (local: number, strength: number, titleDuration: number) => Transform;

const TWO_PI = Math.PI * 2;

/** Battement régulier : le titre grossit / rétrécit légèrement, 2 fois par seconde. */
export const pulse: EffectFn = (local, strength) =>
  transform({scale: 1 + 0.1 * strength * Math.sin(TWO_PI * local * 2)});

/** Gros zoom à l'apparition qui retombe très vite (décroissance exponentielle). */
export const zoomPunch: EffectFn = (local, strength) =>
  transform({scale: 1 + 0.5 * strength * Math.exp(-local * 8)});

/** Zoom lent et continu sur toute la durée du titre (jusqu'à +20 %). */
export const zoomIn: EffectFn = (local, strength, titleDuration) =>
  transform({scale: 1 + 0.2 * strength * progress(local, titleDuration)});

/** Inverse de zoomIn : part de +20 % et revient à la taille normale. */
export const zoomOut: EffectFn = (local, strength, titleDuration) =>
  transform({scale: 1 + 0.2 * strength * (1 - progress(local, titleDuration))});

/**
 * Tremblement DÉTERMINISTE : somme de sinus à fréquences « pas multiples » entre elles,
 * ce qui donne un mouvement qui a l'air aléatoire mais qui est le même à chaque t.
 */
export const shake: EffectFn = (local, strength) => {
  const amplitude = 0.6 * strength; // en % de la hauteur de frame
  return transform({
    translateX: amplitude * (Math.sin(local * 47) + 0.5 * Math.sin(local * 89)) / 1.5,
    translateY: amplitude * (Math.sin(local * 53 + 1) + 0.5 * Math.sin(local * 97)) / 1.5,
  });
};

/** Combinaison des deux : on réutilise compose(), pas de code nouveau. */
export const shakeZoom: EffectFn = (local, strength, titleDuration) =>
  compose(shake(local, strength, titleDuration), zoomPunch(local, strength, titleDuration));

const EFFECTS: Record<Effect["type"], EffectFn> = {pulse, zoomPunch, zoomIn, zoomOut, shake, shakeZoom};

export function sampleEffect(effect: Effect | null, local: number, titleDuration: number): Transform {
  if (!effect) return IDENTITY;
  return EFFECTS[effect.type](local, clamp(effect.strength, 0, 1), titleDuration);
}

function progress(local: number, titleDuration: number): number {
  return titleDuration > 0 ? clamp(local / titleDuration, 0, 1) : 1;
}
