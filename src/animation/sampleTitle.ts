import type {TitleItem} from "../model/montageSchema.ts";
import {compose, IDENTITY, type Transform} from "./transform.ts";
import {sampleEffect} from "./effects.ts";
import {sampleAnimation, visibleCharsFor} from "./animations.ts";

export interface TitleSample extends Transform {
  /** Nombre de caractères de `text` à afficher (typewriter). */
  visibleChars: number;
}

/**
 * LA fonction d'animation : l'état visuel d'un titre au temps `t` (en s, temps du montage).
 * Pure et déterministe : l'aperçu l'appelle à chaque image, un rendu serveur pourrait
 * l'appeler avec le même `t` et obtiendrait exactement le même résultat.
 */
export function sampleTitle(title: TitleItem, t: number): TitleSample {
  const local = t - title.startTime;     // 0 au début du titre
  const remaining = title.endTime - t;   // 0 à la fin du titre
  const titleDuration = title.endTime - title.startTime;

  const parts = [
    sampleEffect(title.effect, local, titleDuration),
    ...sampleAnimation(title.animation, local, remaining),
  ];

  return {
    ...parts.reduce(compose, IDENTITY),
    visibleChars: visibleCharsFor(title.animation, title.text, local),
  };
}

/** Transform → valeur CSS `transform`. Translations en cqh = % de la hauteur de frame. */
export function toCssTransform({scale, translateX, translateY}: Transform): string {
  return `translate(${translateX}cqh, ${translateY}cqh) scale(${scale})`;
}
