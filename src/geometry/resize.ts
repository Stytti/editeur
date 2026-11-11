import {clamp} from "./clamp.ts";

/** Les 4 coins d'un titre : nord-ouest, nord-est, sud-ouest, sud-est. */
export const CORNERS = ["nw", "ne", "sw", "se"] as const;
export type Corner = typeof CORNERS[number];

/** Boîte horizontale d'un titre, en % de la largeur de frame. */
export interface HorizontalBox {
  x: number;
  width: number;
}

/** Largeur minimale d'un titre, en % (sinon on pourrait le réduire à rien et ne plus pouvoir l'attraper). */
export const MIN_WIDTH_PCT = 5;

/**
 * Redimensionne un titre depuis un coin. Fonction PURE, tout en %.
 *
 * Seule la LARGEUR change : la hauteur est une sortie de l'auto-fit (consigne), jamais une entrée.
 * Les coins du haut et du bas se comportent donc pareil : seul le côté (gauche / droite) compte.
 *  - coin droit (ne, se) : le bord gauche reste fixe, la largeur suit la souris ;
 *  - coin gauche (nw, sw) : le bord droit reste fixe, x et la largeur bougent ensemble.
 * Résultat clampé : x ≥ 0, x + width ≤ 100, width ≥ MIN_WIDTH_PCT.
 *
 * @param box   la boîte au DÉBUT du geste (pas la boîte courante : sinon les erreurs d'arrondi s'accumulent)
 * @param dxPct déplacement horizontal de la souris depuis le début du geste, en % de la largeur de frame
 */
export function resizeBox(box: HorizontalBox, corner: Corner, dxPct: number): HorizontalBox {
  if (corner === "ne" || corner === "se") {
    return {x: box.x, width: clamp(box.width + dxPct, MIN_WIDTH_PCT, 100 - box.x)};
  }

  const right = box.x + box.width;
  const x = clamp(box.x + dxPct, 0, right - MIN_WIDTH_PCT);
  return {x, width: right - x};
}
