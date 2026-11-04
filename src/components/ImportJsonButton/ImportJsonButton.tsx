import {type ChangeEvent, useRef} from "react";
import {Button} from "../Button/Button.tsx";
import type {TitleItem} from "../../types/TitleItem.ts";

interface ImportJsonButtonProps {
  text: string;
  onImport: (titles: TitleItem[]) => void;
  onError: (message: string) => void;
  className?: string;
}

export function ImportJsonButton({text, className, onImport, onError}: ImportJsonButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    // On vide l'input : sinon, choisir à nouveau le même fichier ne déclenche pas onChange.
    input.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      onImport(JSON.parse(text));
    } catch {
      onError(`« ${file.name} » n'est pas un fichier JSON valide.`);
    }
  }

  return (
    <>
      <input type="file" accept=".json,application/json" hidden
             ref={fileInputRef} onChange={handleFileChange}/>
      <Button text={text} className={className}
              onButtonClick={() => fileInputRef.current?.click()}/>
    </>
  );
}
