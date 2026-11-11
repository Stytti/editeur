/**
 * Une transformation visuelle à un instant donné.
 * Translations en % de la HAUTEUR de frame (cqh côté CSS), comme fontSize / strokeWidth.
 */
export interface Transform {
  scale: number;
  translateX: number;
  translateY: number;
  opacity: number;
}

/** « Ne rien changer » : l'élément neutre de compose(). */
export const IDENTITY: Transform = {scale: 1, translateX: 0, translateY: 0, opacity: 1};

/** Empile deux transformations : scales et opacités multipliés, translations additionnées. */
export function compose(a: Transform, b: Transform): Transform {
  return {
    scale: a.scale * b.scale,
    translateX: a.translateX + b.translateX,
    translateY: a.translateY + b.translateY,
    opacity: a.opacity * b.opacity,
  };
}

/** Raccourci : IDENTITY avec seulement quelques champs modifiés. */
export function transform(partial: Partial<Transform>): Transform {
  return {...IDENTITY, ...partial};
}
