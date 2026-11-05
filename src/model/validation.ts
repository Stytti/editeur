import type {TitleItem} from "./montageSchema.ts";


export function validateTitle(title: TitleItem, duration: number): Map<string, string> {
  let errors: Map<string, string> = new Map();

  if (title.startTime < 0) {
    errors.set("startTime", "Le temps de début ne peut pas être négatif.");
  }

  if (title.startTime > title.endTime) {
    errors.set("startTime", "Le temps de début ne peut pas être supérieur au temps de fin.");
  }

  if (title.endTime > duration) {
    errors.set("endTime", "Le temps de fin ne peut pas dépasser la durée de la vidéo.");
  }

  if (title.fontSize <= 0) {
    errors.set("fontSize", "La taille de la police doit être supérieure à zéro.");
  }

  if (title.strokeWidth < 0) {
    errors.set("strokeWidth", "L'épaisseur du contour ne peut pas être négative.");
  }

  if (title.shinyWidth < 0) {
    errors.set("shinyWidth", "La largeur de l'effet de brillance ne peut pas être négative.");
  }

  if (title.width <= 0) {
    errors.set("width", "La largeur du titre doit être supérieure à zéro.");
  }

  if ((title.x + title.width) > 100) {
    errors.set("x", "Le titre dépasse les limites de la vidéo.");
  }

  if ((title.y + title.height) > 100) {
    errors.set("y", "Le titre dépasse les limites de la vidéo.");
  }

  return errors;
}