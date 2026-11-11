import {type ChangeEvent, type ReactNode, useRef} from "react";
import {Button} from "../Button/Button.tsx";
import {type Montage} from "../../model/montageSchema.ts";
import {parseMontage} from "../../model/montage.ts";

interface ImportJsonButtonProps {
  children: ReactNode;
  onImport: (montage: Montage) => void;
  onError: (message: string) => void;
  className?: string;
}

export function ImportJsonButton({children, className, onImport, onError}: ImportJsonButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.target;
    const file = input.files?.[0];
    // On vide l'input : sinon, choisir à nouveau le même fichier ne déclenche pas onChange.
    input.value = "";
    if (!file) return;

    // Le bouton s'occupe du FICHIER (le lire), parseMontage s'occupe du CONTENU.
    let montage: Montage;
    try {
      montage = parseMontage(await file.text());
    } catch (error) {
      onError(`« ${file.name} » : ${error instanceof Error ? error.message : "erreur inconnue"}`);
      return;
    }
    // Hors du try : une erreur dans onImport ne doit pas être affichée comme « fichier invalide ».
    onImport(montage);
  }

  return (
    <>
      <input type="file" accept=".json,application/json" hidden
             ref={fileInputRef} onChange={handleFileChange}/>
      <Button className={className}
              onButtonClick={() => fileInputRef.current?.click()}>
        {children}
      </Button>
    </>
  );
}
