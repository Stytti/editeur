import './Header.css'
import {Button} from "../../components/Button/Button.tsx";
import {Field} from "../../components/Field/Field.tsx";
import {ImportJsonButton} from "../../components/ImportJsonButton/ImportJsonButton.tsx";
import {DEUXIEME_VIDEO_ID, PREMIERE_VIDEO_ID, TROISIEME_VIDEO_ID} from "../../types/Constant.ts";
import type {Montage} from "../../model/montageSchema.ts";

interface HeaderProps {
  videoSrc: string;
  videoChange: (videoId: string) => void;
  addNewTitle: () => void,
  onImport: (montage: Montage) => void;
  onImportError: (message: string) => void;
}

export function Header({videoSrc, videoChange, addNewTitle, onImport, onImportError}: HeaderProps) {
  const videoOptions = [
    {value: PREMIERE_VIDEO_ID, label: "Vidéo 1"},
    {value: DEUXIEME_VIDEO_ID, label: "Vidéo 2"},
    {value: TROISIEME_VIDEO_ID, label: "Vidéo 3"}
  ];

  const onExport = () => {
    console.log("Export JSON clicked");
  }

  return (
    <header className="toolbar">
      <div className="toolbar__brand">
        <span className="toolbar__logo" aria-hidden="true"/>
        <strong className="toolbar__title">Éditeur de titres</strong>
      </div>
      <div className="toolbar__actions">
        <Field fieldType="select" label="Vidéo à utiliser" options={videoOptions} value={videoSrc}
               onChange={(value) => videoChange(value)}/>
        <ImportJsonButton text="Importer JSON" onImport={onImport} onError={onImportError}/>
        <Button text="Exporter JSON" onButtonClick={onExport}/>
        <Button text="+ Ajouter un titre" className="btn--primary" onButtonClick={addNewTitle}/>
      </div>
    </header>
  )
}