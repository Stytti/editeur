import {useState} from "react";
import type {TitleItem} from "../types/TitleItem";
import {titleService} from "./TitleService.ts";

export function useTitles() {

  const [titles, setTitles] = useState<TitleItem[]>(
    () => titleService.getInitialTitles()
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addNewTitle = () => {
    const newTitle = titleService.createNewTitle();

    setTitles(prev => [...prev, newTitle]);
    setSelectedId(newTitle.id);
  };

  const duplicateTitle = () => {
    if (selectedId) {
      const titleToDuplicate = titles.find(title => title.id === selectedId);
      if (titleToDuplicate) {
        const duplicatedTitle = { ...titleToDuplicate, id: `title-${Date.now()}` };
        setTitles(prev => [...prev, duplicatedTitle]);
        setSelectedId(duplicatedTitle.id);
      }
    }
    // AFFICHER ALERT Un titre doit être sélectionné pour être dupliqué
  }

  const deleteTitle = () => {
    if (selectedId) {
      setTitles(prev => prev.filter(title => title.id !== selectedId));
      setSelectedId(null);
    }
    // AFFICHER ALERT Un titre doit être sélectionné pour être supprimé
  };

  return {
    titles,
    setTitles,
    addNewTitle,
    duplicateTitle,
    deleteTitle,
    selectedId,
    setSelectedId
  };
}