import './App.css'
import {Header} from "./layout/Header/Header.tsx";
import {LayerList} from "./features/layers/LayerList/LayerList.tsx";
import {PropertiesPanel} from "./features/PropertiesPanel/PropertiesPanel.tsx";
import {useCallback, useEffect, useState} from "react";
import {Preview} from "./features/Preview/Preview.tsx";
import {PREMIERE_VIDEO_ID} from "./types/Constant.ts";
import {useMontage} from "./services/useMontage.ts";
import {Alert} from "./components/Alert/Alert.tsx";
import {describeInvalidTitles, serializeMontage} from "./model/montage.ts";
import {downloadTextFile} from "./services/downloadFile.ts";

/** Vrai si l'élément reçoit du texte tapé au clavier (input, textarea, select, contentEditable). */
function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) return false;
    return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function App() {
    const [videoSrc, setVideoSrc] = useState<string>(PREMIERE_VIDEO_ID);

    const {
        montage, duration, titles, selectedId, selectedTitle, setSelectedId,
        importMontage, addNewTitle, updateTitle, duplicateTitle, deleteTitle
    } = useMontage();

    const [error, setError] = useState<string|null>(null);

    const clearError = useCallback(() => setError(null), []);

    // Export : on refuse un montage invalide (le serveur ne pourrait pas le rendre),
    // sinon on télécharge exactement le modèle, au même format que l'import.
    function handleExport() {
        const problems = describeInvalidTitles(montage);
        if (problems) {
            setError(problems);
            return;
        }
        downloadTextFile(serializeMontage(montage), "montage.json");
    }

    // Backspace / Delete → supprime le titre sélectionné, SAUF si on est en train de taper
    // (champ du panneau ou texte édité dans l'aperçu) : là, la touche doit effacer une lettre.
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key !== "Delete" && e.key !== "Backspace") return;
            if (isTypingTarget(e.target)) return;
            deleteTitle();
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [deleteTitle]);

    return (
        <div className="app">
            <Header videoSrc={videoSrc} videoChange={setVideoSrc} addNewTitle={addNewTitle}
                    onImport={importMontage} onImportError={setError} onExport={handleExport} />

            <div className="app__main">
                <aside className="sidebar">
                    <LayerList titles={titles} selectedTitleId={selectedId}
                               onSelect={setSelectedId} onDuplicate={duplicateTitle} onDelete={deleteTitle} />
                </aside>

                <main className="stage">
                    <Preview videoSrc={videoSrc} titles={titles} duration={duration} selectedId={selectedId}
                             onSelect={setSelectedId} onTitleChange={updateTitle} />
                </main>

                <aside className="panel">
                    {selectedTitle ? (
                        <PropertiesPanel titleItem={selectedTitle} duration={duration}
                                         onFieldChange={updateTitle} />
                    ) : (
                        <p className="panel__empty">Sélectionnez un titre pour modifier ses propriétés</p>
                    )}
                </aside>
            </div>

            {error && (
              <Alert message={error} onClose={clearError} />)
            }

        </div>
    )
}

export default App
