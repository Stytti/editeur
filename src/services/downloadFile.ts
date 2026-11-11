/**
 * Fait télécharger un texte au navigateur, sans librairie :
 * on emballe le texte dans un Blob, on lui donne une URL temporaire, et on « clique » sur un lien.
 */
export function downloadTextFile(content: string, fileName: string, mimeType = "application/json"): void {
  const blob = new Blob([content], {type: mimeType});
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url); // libère la mémoire occupée par le Blob
}
