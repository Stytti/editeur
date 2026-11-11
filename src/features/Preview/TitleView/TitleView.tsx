import type {TitleItem} from "../../../model/montageSchema.ts";
import {type KeyboardEvent, type PointerEvent, type RefObject, useEffect, useLayoutEffect, useRef, useState} from "react";
import {clamp} from "../../../geometry/clamp.ts";
import {type Corner, CORNERS, resizeBox} from "../../../geometry/resize.ts";
import {getTitleStyle} from "./getTitleStyle.ts";
import {sampleTitle, toCssTransform} from "../../../animation/sampleTitle.ts";

// Marge ajoutée sous le texte par l'auto-fit, en % de la hauteur de frame.
const AUTO_FIT_MARGIN_PCT = 1;
// En dessous de cet écart (en %), on ne touche pas à la hauteur : c'est ce qui stoppe la boucle mesure → rendu → mesure.
const AUTO_FIT_TOLERANCE_PCT = 0.1;

interface TitleViewProps {
  title: TitleItem,
  currentTime: number,
  isSelected: boolean,
  frameRef: RefObject<HTMLDivElement | null>,
  onSelect: (id: string) => void,
  onTitleChange: (updatedTitle: TitleItem) => void
}

// Ce qu'on retient au début d'un geste : ce qu'on fait (déplacer ou tirer un coin),
// le titre tel qu'il était + la position de la souris. Tous les calculs partent de cet état de départ.
interface DragStart {
  mode: "move" | Corner;
  title: TitleItem;
  mouseX: number;
  mouseY: number;
}

export function TitleView({ title, currentTime, isSelected, frameRef, onSelect, onTitleChange }: TitleViewProps) {
  const dragStart = useRef<DragStart | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Édition inline : état d'INTERFACE local (le reste de l'app n'a pas besoin de le savoir).
  const [isEditing, setIsEditing] = useState(false);

  // --- Auto-fit de la hauteur ---
  // `height` est une SORTIE de la mesure, jamais une entrée : on mesure le texte et on ajuste la boîte.
  // useLayoutEffect : la correction est faite avant que l'écran se dessine → pas de clignotement.
  useLayoutEffect(() => {
    let cancelled = false;

    function fitHeight() {
      const text = textRef.current;
      const frame = frameRef.current;
      if (cancelled || !text || !frame || frame.clientHeight === 0) return;

      // 1. mesurer (px écran) → convertir en % de la frame, comme le reste du modèle
      const textHeightPct = (text.scrollHeight / frame.clientHeight) * 100;
      const newHeight = textHeightPct + AUTO_FIT_MARGIN_PCT;

      // 2. comparer : presque pareil → on ne fait rien
      if (Math.abs(newHeight - title.height) < AUTO_FIT_TOLERANCE_PCT) return;

      // 3. corriger
      onTitleChange({...title, height: newHeight});
    }

    fitHeight();
    // Les polices web arrivent après le premier rendu : la taille du texte change → on remesure.
    void document.fonts.ready.then(fitHeight);

    return () => { cancelled = true; };
    // Volontairement PAS `title.height` (sinon boucle) ni `title` entier : seulement ce qui change la taille du texte.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title.text, title.fontId, title.fontSize, title.width, title.strokeWidth]);

  function startGesture(e: PointerEvent<HTMLElement>, mode: DragStart["mode"]) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { mode, title, mouseX: e.clientX, mouseY: e.clientY };
    onSelect(title.id);
  }

  function handlePointerDown(e: PointerEvent<HTMLDivElement>) {
    if (isEditing) return; // en édition, le clic sert à placer le curseur, pas à déplacer
    startGesture(e, "move");
  }

  function handleCornerPointerDown(e: PointerEvent<HTMLSpanElement>, corner: Corner) {
    e.stopPropagation(); // sinon le titre (parent) démarre AUSSI un déplacement
    startGesture(e, corner);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const start = dragStart.current;
    const frame = frameRef.current;
    if (!start || !frame) return;

    // Déplacement de la souris en px écran → converti en % de la frame (le modèle est en %).
    const rect = frame.getBoundingClientRect();
    const dxPct = ((e.clientX - start.mouseX) / rect.width) * 100;
    const dyPct = ((e.clientY - start.mouseY) / rect.height) * 100;

    if (start.mode === "move") {
      onTitleChange({
        ...start.title,
        x: clamp(start.title.x + dxPct, 0, 100 - start.title.width),
        y: clamp(start.title.y + dyPct, 0, 100 - start.title.height),
      });
    } else {
      onTitleChange({...start.title, ...resizeBox(start.title, start.mode, dxPct)});
    }
  }

  function handlePointerUp() {
    dragStart.current = null;
  }

  // --- Édition inline ---
  // Pendant l'édition, React NE TOUCHE PAS au texte (sinon le curseur revient au début à chaque frappe) :
  // on remplit l'élément une fois au début, le navigateur gère la saisie, on relit le texte à la fin.
  useEffect(() => {
    const el = textRef.current;
    if (!isEditing || !el) return;

    el.innerText = title.text;
    el.focus();
    // Tout sélectionner : on peut retaper directement par-dessus.
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    // Volontairement seulement [isEditing] : on ne veut PAS réécrire le texte pendant la saisie.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  function finishEditing() {
    const el = textRef.current;
    if (el) {
      // innerText garde les retours à la ligne. Le navigateur ajoute parfois un \n final : on l'enlève.
      const text = el.innerText.replace(/\n$/, "");
      if (text !== title.text) onTitleChange({...title, text});
    }
    setIsEditing(false);
  }

  function handleEditKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Escape") e.currentTarget.blur(); // blur → finishEditing
  }

  const className = [
    "title-layer",
    isSelected && "title-layer--selected",
    isEditing && "title-layer--editing",
  ].filter(Boolean).join(" ");

  // Animation : état visuel au temps courant, calculé par une fonction PURE de t (voir animation/).
  // En édition on la coupe : on veut voir le texte entier, net, sans qu'il bouge sous le curseur.
  const sample = isEditing ? null : sampleTitle(title, currentTime);
  const style = sample
    ? {...getTitleStyle(title), transform: toCssTransform(sample), opacity: sample.opacity}
    : getTitleStyle(title);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onDoubleClick={() => setIsEditing(true)}
      className={className}
      style={style}
    >
      {/* key : en passant en édition, React crée un NOUVEL élément (vide, rempli par l'effet).
          Sans ça, React mélangerait son texte avec celui tapé dans le navigateur à la sortie. */}
      {isEditing ? (
        <div key="editing" ref={textRef} className="title-layer__text"
             contentEditable suppressContentEditableWarning
             onBlur={finishEditing} onKeyDown={handleEditKeyDown}/>
      ) : (
        // Typewriter : les lettres pas encore « tapées » sont là mais invisibles →
        // la mise en page (retours à la ligne, hauteur mesurée par l'auto-fit) ne bouge pas.
        <div key="view" ref={textRef} className="title-layer__text">
          {title.text.slice(0, sample?.visibleChars)}
          <span style={{visibility: "hidden"}}>{title.text.slice(sample?.visibleChars ?? title.text.length)}</span>
        </div>
      )}

      {isSelected && !isEditing && CORNERS.map((corner) => (
        <span key={corner} className={`handle handle--${corner}`}
              onPointerDown={(e) => handleCornerPointerDown(e, corner)}/>
      ))}
    </div>
  );
}
