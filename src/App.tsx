import './App.css'
import {Header} from "./layout/Header/Header.tsx";
import {LayerList} from "./features/layers/LayerList/LayerList.tsx";
import {PropertiesPanel} from "./features/PropertiesPanel/PropertiesPanel.tsx";
import {useCallback, useState} from "react";
import {Preview} from "./features/Preview/Preview.tsx";
import {PREMIERE_VIDEO_ID} from "./types/Constant.ts";
import {useTitles} from "./services/useTitles.ts";
import type {Montage, TitleItem} from "./model/montageSchema.ts";
import {Alert} from "./components/Alert/Alert.tsx";

function App() {
    const [videoSrc, setVideoSrc] = useState<string>(PREMIERE_VIDEO_ID);

    const { titles, setTitles, addNewTitle, selectedId, setSelectedId, duplicateTitle, deleteTitle } = useTitles();
    const [duration, setDuration] = useState<number>(0);

    const [error, setError] = useState<string|null>(null);

    const selectedTitleItem = titles.find((titleItem) => titleItem.id === selectedId);

    function handleFieldChange(updatedTitleItem: TitleItem) {
        setTitles((prevTitles) =>
            prevTitles.map((title) =>
                (title.id === updatedTitleItem.id ? updatedTitleItem : title)
            )
        );
    }

    function importTitles(montage: Montage) {
        setTitles(montage.titles);
        setDuration(montage.duration);
        setSelectedId(null);
    }

    const clearError = useCallback(() => setError(null), []);

    return (
        <div className="app">
            <Header videoSrc={videoSrc} videoChange={setVideoSrc} addNewTitle={addNewTitle}
                    onImport={importTitles} onImportError={setError} />

            {error && (
                <Alert message={error} onClose={clearError} />)
            }

            <div className="app__main">
                <aside className="sidebar">
                    <LayerList titles={titles} selectedTitleId={selectedId}
                               onSelect={setSelectedId} onDuplicate={duplicateTitle} onDelete={deleteTitle} />
                </aside>

                <main className="stage">
                    <Preview videoSrc={videoSrc} titles={titles}
                             onSelect={setSelectedId} onTitleChange={handleFieldChange} />
                </main>

                <aside className="panel">
                    {selectedTitleItem ? (
                        <PropertiesPanel titleItem={selectedTitleItem} duration={duration}
                                         onFieldChange={handleFieldChange} />
                    ) : (
                        <p className="panel__empty">Sélectionnez un titre pour modifier ses propriétés</p>
                    )}
                </aside>
            </div>
        </div>
    )
}

export default App
