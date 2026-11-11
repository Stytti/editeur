import {z} from "zod";
import {type Montage, MontageSchema} from "./montageSchema.ts";
import {validateTitle} from "./validation.ts";

/**
 * Montage → texte JSON (indenté, lisible). Inverse de parseMontage :
 * parseMontage(serializeMontage(m)) redonne m (testé dans montage.test.ts).
 * Rien à convertir : le modèle est déjà au format du serveur (positions en %, null gardés).
 */
export function serializeMontage(montage: Montage): string {
  return JSON.stringify(montage, null, 2);
}

/**
 * Message listant les titres invalides (mêmes règles que le panneau), ou null si tout est bon.
 * Pure : l'appelant décide quoi faire du message (bloquer l'export, afficher l'alerte).
 */
export function describeInvalidTitles(montage: Montage): string | null {
  const lines = montage.titles.flatMap((title) => {
    const errors = Object.values(validateTitle(title, montage.duration));
    return errors.length > 0 ? [`« ${title.text || title.id} » : ${errors.join(" ")}`] : [];
  });
  return lines.length > 0 ? `Export impossible, corrigez d'abord :\n${lines.join("\n")}` : null;
}

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
