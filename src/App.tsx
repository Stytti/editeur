import './App.css'
import {Header} from "./layout/Header/Header.tsx";
import {LayerList} from "./features/layers/LayerList/LayerList.tsx";
import {PropertiesPanel} from "./features/PropertiesPanel/PropertiesPanel.tsx";
import {useState} from "react";
import type {TitleItem} from "./types/TitleItem.ts";
import {Preview} from "./features/Preview/Preview.tsx";
import {PREMIERE_VIDEO_ID} from "./types/Constant.ts";
import {useTitles} from "./services/useTitles.ts";

function App() {
    const [videoSrc, setVideoSrc] = useState<string>(PREMIERE_VIDEO_ID);

    const { titles, setTitles, addNewTitle, selectedId, setSelectedId, duplicateTitle, deleteTitle } = useTitles();

    const selectedTitleItem = titles.find((titleItem) => titleItem.id === selectedId);

    function handleFieldChange(updatedTitleItem: TitleItem) {
        setTitles((prevTitles) =>
            prevTitles.map((title) =>
                (title.id === updatedTitleItem.id ? updatedTitleItem : title)
            )
        );
    }

    return (
        <div className="app">
            <Header videoSrc={videoSrc} videoChange={setVideoSrc} addNewTitle={addNewTitle} />
            <div className="app__main">
                <aside className="sidebar">
                    <LayerList titles={titles} selectedTitleId={selectedId}
                               onSelect={setSelectedId} onDuplicate={duplicateTitle} onDelete={deleteTitle} />
                </aside>

                <main className="stage">
                    <Preview videoSrc={videoSrc} titles={titles} />
                </main>

                <aside className="panel">
                    {selectedTitleItem ? (
                        <PropertiesPanel titleItem={selectedTitleItem}
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
