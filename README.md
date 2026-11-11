# Éditeur de titres multi-couches

Éditeur de titres animés posés sur une vidéo verticale 9:16 (React 19, TypeScript, Vite, Zod, Vitest).
On importe un montage JSON, on ajoute / déplace / redimensionne / édite des titres dans l'aperçu,
on règle leurs propriétés dans le panneau, et on exporte un JSON au même format.

## Lancer le projet

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # tests unitaires (Vitest)
npm run build      # tsc -b + build de production
npm run lint       # oxlint
```

**Vidéos** : les fichiers `video1.mp4`, `video2.mp4`, `video3.mp4` sont à placer dans `public/media/`.
Ce dossier est ignoré par git (fichiers lourds).

## Architecture

```
src/
  model/       schéma Zod (montageSchema), parse / serialize, validation, visibilité   ← purs, testés
  geometry/    conversions % ↔ px, clamp, redimensionnement par coin                   ← purs, testés
  animation/   effets, entrées / sorties, ghost, sampleTitle(title, t)                 ← purs, testés
  services/    useMontage (état du montage + sélection), téléchargement de fichier
  features/    Preview (vidéo, titres, drag, édition inline), Timeline, layers, PropertiesPanel
  components/  briques réutilisables (Button, Field, Alert, ImportJsonButton)
```

La logique métier vit dans des **modules purs sans React** (`model/`, `geometry/`, `animation/`) :
ils se testent avec de simples valeurs, et les composants ne font que les appeler.

### Unités

- **Modèle en %** de la frame, exactement comme le JSON du serveur : `x`, `width` en % de la largeur ;
  `y`, `height`, `fontSize`, `strokeWidth`, `shinyWidth` en % de la **hauteur**.
  Côté CSS, ces dernières valeurs sont en `cqh` (la frame est un *container* : 1 cqh = 1 % de sa hauteur),
  ce qui garde l'aperçu proportionnel quelle que soit sa taille à l'écran.
- **Panneau en px** de la frame d'export 1080×1920 (plus parlant pour un humain), converti à l'entrée / la sortie.
- **Z-order = ordre du tableau** : le dernier titre est dessiné au-dessus. La liste des calques l'affiche inversé
  (premier plan en haut) ; un titre dupliqué est inséré juste au-dessus de l'original.

### Import / export

- Import : `parseMontage` valide le fichier avec Zod ; en cas d'erreur, un message lisible s'affiche et rien n'est chargé.
- Export : refusé si un titre est invalide (mêmes règles que le panneau), sinon `serializeMontage` télécharge `montage.json`.
- **Round-trip testé** : importer puis exporter redonne le même JSON (valeurs `null`, `fontId` inconnu de la liste,
  effets et animations compris).

## Animations : pourquoi des fonctions de `t`

Chaque effet / animation est une **fonction pure du temps** : `sampleTitle(title, t)` renvoie
`{ scale, translateX, translateY, opacity, visibleChars }`. Les morceaux (effet, entrée, sortie, ghost)
se combinent avec `compose` (scales et opacités multipliés, translations additionnées).

Pas de `@keyframes` CSS, volontairement : le rendu serveur (ffmpeg) fabrique la vidéo **image par image** et doit
savoir exactement où est un titre à 2,35 s. Une animation CSS, seul le navigateur sait la jouer.
Une fonction de `t`, l'aperçu et un rendu serveur peuvent l'appeler avec le même `t` et obtenir **le même résultat**
→ parité aperçu / export. Pour la même raison, aucun `Math.random()` : le `shake` est une somme de sinus.

- Effets : `pulse`, `zoomPunch`, `zoomIn`, `zoomOut`, `shake`, `shakeZoom` (= shake + zoomPunch), intensité `strength` 0..1.
- Entrées : `fade`, `bounce` (easeOutBack), `slide`, `typewriter` (lettres non tapées présentes mais invisibles :
  la mise en page ne bouge pas). Sorties : `fade`, `slideRight`, `slideDown`. `ghost` : flottement continu.
- Pendant la lecture, le temps est lu à chaque image (`requestAnimationFrame`) plutôt qu'avec `timeupdate` (~4 fois/s).

## Choix d'interprétation

- **Contour (`strokeWidth`)** : interprété comme l'épaisseur **visible** du contour, tracé vers l'extérieur
  des lettres comme le `borderw` d'ffmpeg. En CSS, `-webkit-text-stroke` est centré sur le bord de la lettre
  et `paint-order: stroke fill` en cache la moitié intérieure : la valeur est donc **doublée** pour que la partie
  visible fasse `strokeWidth`. Conséquence assumée : le `strokeWidth: 2` du JSON d'exemple (2 % de 1920 = 38 px,
  pour des lettres de 84 px) donne un contour très épais. C'est la donnée qui est épaisse, pas le rendu.
- **Auto-fit de la hauteur** : `height` est une *sortie* de la mesure du texte (+ 1 % de marge), jamais une entrée.
  Elle est recalculée quand le texte, la police, la taille, la largeur ou le contour changent, et après le chargement
  des polices. Conséquence : dès l'import, la hauteur peut être ajustée, donc un import → export **depuis l'éditeur**
  peut modifier `height` (les autres champs restent identiques).

## Limites connues

- Si la vidéo est **plus courte** que `duration`, elle s'arrête à sa fin alors que le montage continue :
  les titres placés après ne se voient qu'en déplaçant le scrubber. Le cas inverse (vidéo plus longue) est géré :
  la lecture s'arrête à `duration`.
- La police `snowball` n'existe pas sur Google Fonts : elle s'affiche avec une police de repli.
- Les animations sont coupées pendant l'édition inline du texte (pour taper sur un texte entier et immobile).

## Avec plus de temps

- Undo / redo (l'état est déjà centralisé dans `useMontage`, un historique d'états suffirait).
- Poignées sur la timeline pour régler `startTime` / `endTime` à la souris.
- Plus d'effets et d'entrées (il suffit d'ajouter une fonction dans `animation/`).
- Réordonner les calques par glisser-déposer.
