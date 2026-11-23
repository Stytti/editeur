import type {CSSProperties} from "react";
import type {TitleItem} from "../../../model/montageSchema.ts";
import {FONTS} from "../../../types/Constant.ts";

// Coins arrondis du fond, en cqh (% de la hauteur de frame) pour rester proportionnels comme le reste.
const BACKGROUND_RADIUS_CQH = 1;

/** Police CSS du titre, avec un repli si elle n'est pas chargée (ex. "snowball", absente de Google Fonts). */
export function getFontFamily(fontId: string): string {
  const label = FONTS.find((font) => font.value === fontId)?.label ?? fontId;
  return `"${label}", sans-serif`;
}

export function getTitleStyle(title: TitleItem): CSSProperties {
  return {
    left: `${title.x}%`,
    top: `${title.y}%`,
    width: `${title.width}%`,
    height: `${title.height}%`,

    fontFamily: getFontFamily(title.fontId),
    fontSize: `${title.fontSize}cqh`,
    color: title.color,
    textAlign: title.align,

    // Trait centré sur le bord de la lettre, moitié intérieure cachée par paint-order :
    // le contour dépasse de strokeWidth / 2 autour des lettres (place réservée par getTextStyle).
    WebkitTextStroke: title.strokeWidth > 0 ? `${title.strokeWidth}cqh ${title.strokeColor}` : undefined,

    // Glow : halo flou de la couleur du contour. Deux ombres empilées → halo plus dense.
    textShadow: title.shinyWidth > 0
      ? `0 0 ${title.shinyWidth}cqh ${title.strokeColor}, 0 0 ${title.shinyWidth}cqh ${title.strokeColor}`
      : "none",

    // Fond : rectangle arrondi sur toute la boîte. null = transparent.
    backgroundColor: title.backgroundColor ?? "transparent",
    borderRadius: title.backgroundColor ? `${BACKGROUND_RADIUS_CQH}cqh` : undefined,
  };
}

/**
 * Style du texte dans la boîte : un padding vertical égal à ce qui dépasse du contour (strokeWidth / 2).
 * scrollHeight compte le padding → l'auto-fit inclut le contour, qui ne sort plus de la boîte.
 */
export function getTextStyle(title: TitleItem): CSSProperties {
  return {paddingBlock: `${title.strokeWidth / 2}cqh`};
}
