import {useState} from "react";
import type {Montage, TitleItem} from "../model/montageSchema.ts";
import {createNewTitle} from "../model/createTitle.ts";
import sampleMontage from "../model/sample.json?raw";
import {parseMontage} from "../model/montage.ts";

export function useMontage() {

  // Initialiseur paresseux : le JSON d'exemple n'est parsé qu'une seule fois, au montage du composant
  const [montage, setMontage] = useState<Montage>(() => parseMontage(sampleMontage));

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {duration, titles} = montage;
  const selectedTitle = titles.find(title => title.id === selectedId) ?? null;

  const setTitles = (update: (prev: TitleItem[]) => TitleItem[]) => {
    setMontage(prev => ({...prev, titles: update(prev.titles)}));
  };

  const setDuration = (duration: number) => {
    setMontage(prev => ({...prev, duration}));
  };

  const importMontage = (imported: Montage) => {
    setMontage(imported);
    setSelectedId(null);
  };

  const addNewTitle = () => {
    const newTitle = createNewTitle();
    setTitles(prev => [...prev, newTitle]);
    setSelectedId(newTitle.id);
  };

  const updateTitle = (updatedTitle: TitleItem) => {
    setTitles(prev => prev.map(title => (title.id === updatedTitle.id ? updatedTitle : title)));
  };

  // La copie est insérée JUSTE APRÈS l'original dans le tableau → dessinée juste au-dessus de lui
  // (z-order = ordre du tableau). randomUUID : deux clics dans la même milliseconde ne donnent pas le même id.
  const duplicateTitle = () => {
    if (!selectedTitle) return; // boutons désactivés sans sélection : simple garde

    const duplicatedTitle = {...selectedTitle, id: crypto.randomUUID()};
    setTitles(prev => {
      const index = prev.findIndex(title => title.id === selectedTitle.id);
      return prev.toSpliced(index + 1, 0, duplicatedTitle);
    });
    setSelectedId(duplicatedTitle.id);
  };

  const deleteTitle = () => {
    if (!selectedId) return; // boutons désactivés sans sélection : simple garde

    setTitles(prev => prev.filter(title => title.id !== selectedId));
    setSelectedId(null);
  };

  return {
    montage,
    duration,
    titles,
    selectedId,
    selectedTitle,
    setSelectedId,
    setDuration,
    importMontage,
    addNewTitle,
    updateTitle,
    duplicateTitle,
    deleteTitle
  };
}
