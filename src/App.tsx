import './App.css'
import {Header} from "./layout/Header/Header.tsx";
import {LayerList} from "./features/layers/LayerList/LayerList.tsx";
import {PropertiesPanel} from "./features/PropertiesPanel/PropertiesPanel.tsx";
import {useCallback, useState} from "react";
import {Preview} from "./features/Preview/Preview.tsx";
import {PREMIERE_VIDEO_ID} from "./types/Constant.ts";
import {useMontage} from "./services/useMontage.ts";
import {Alert} from "./components/Alert/Alert.tsx";

function App() {
    const [videoSrc, setVideoSrc] = useState<string>(PREMIERE_VIDEO_ID);

    const {
        duration, titles, selectedId, selectedTitle, setSelectedId,
        importMontage, addNewTitle, updateTitle, duplicateTitle, deleteTitle
    } = useMontage();

    const [error, setError] = useState<string|null>(null);

    const clearError = useCallback(() => setError(null), []);

    return (
        <div className="app">
            <Header videoSrc={videoSrc} videoChange={setVideoSrc} addNewTitle={addNewTitle}
                    onImport={importMontage} onImportError={setError} />

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
