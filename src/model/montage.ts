import {z} from "zod";
import {type Montage, MontageSchema} from "./montageSchema.ts";

/**
 * Transforme le texte d'un fichier JSON en Montage valide.
 *
 * Fonction PURE : elle reçoit une chaîne et renvoie un résultat. Elle ne lit pas de fichier,
 * ne touche pas à React, n'appelle pas de callback → on peut la tester avec de simples chaînes.
 *
 * En cas de problème, elle LANCE une Error avec un message lisible. C'est l'appelant
 * (le bouton d'import) qui décide quoi en faire (afficher l'alerte).
 */
export function parseMontage(json: string): Montage {
  let raw: unknown;
  try {
    raw = JSON.parse(json);
  } catch {
    throw new Error("Ce n'est pas du JSON valide (erreur de syntaxe).");
  }

  const result = MontageSchema.safeParse(raw);
  if (!result.success) {
    throw new Error(`Montage invalide :\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}
