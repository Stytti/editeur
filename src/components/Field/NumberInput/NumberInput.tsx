import {type ChangeEvent, useState} from "react";
import type {NumberFieldProps} from "../Field.type.ts";

// Mêmes props que le champ nombre, sans ce que gère Field (le libellé, le type).
type NumberInputProps = Omit<NumberFieldProps, "fieldType" | "label">;

// Nombre de décimales affichées quand on ne tape pas (le modèle, lui, garde toute la précision).
function decimalsOf(step: number | undefined): number {
  if (step === undefined) return 2;
  return (step.toString().split(".")[1] ?? "").length;
}

export function NumberInput({value, onChange, error, step, min, max, disabled}: NumberInputProps) {
  // Brouillon : le TEXTE tapé, seulement pendant la saisie. null = on affiche la valeur du modèle.
  const [draft, setDraft] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;      // un input renvoie TOUJOURS une chaîne, même type="number"
    setDraft(text);

    const number = e.target.valueAsNumber;  // NaN si vide ou invalide
    if (text !== "" && !Number.isNaN(number)) {
      onChange(number);               // on ne remonte au parent que des nombres valides
    }
  }

  const isEmpty = draft !== null && draft.trim() === "";
  const shownValue = draft ?? Number(value.toFixed(decimalsOf(step)));

  return (
    <input type="number" className="input"
           value={shownValue} step={step} min={min} max={max} disabled={disabled}
           aria-invalid={isEmpty || Boolean(error)}
           onChange={handleChange}
           onBlur={() => setDraft(null)} />   // fin de saisie : on réaffiche la vraie valeur
  );
}
