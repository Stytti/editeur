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

  const duplicateTitle = () => {
    // AFFICHER ALERT Un titre doit être sélectionné pour être dupliqué
    if (!selectedTitle) return;

    const duplicatedTitle = {...selectedTitle, id: `title-${Date.now()}`};
    setTitles(prev => [...prev, duplicatedTitle]);
    setSelectedId(duplicatedTitle.id);
  };

  const deleteTitle = () => {
    // AFFICHER ALERT Un titre doit être sélectionné pour être supprimé
    if (!selectedId) return;

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
