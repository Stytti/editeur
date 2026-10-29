import './App.css'
import {Header} from "./layout/Header/Header.tsx";
import {LayerList} from "./features/layers/LayerList/LayerList.tsx";
import {Timeline} from "./features/Timeline/Timeline.tsx";
import {PropertiesPanel} from "./features/PropertiesPanel/PropertiesPanel.tsx";
import {useState} from "react";
import type {TitleItem} from "./types/TitleItem.tsx";

const firstTitle: TitleItem = {
    id: "title-1",
    text: "mon ame",
    startTime: 0,
    endTime: 8,
    x: 10,
    y: 40,
    width: 80,
    height: 16,
    fontId: "snowball",
    fontSize: 4.4,
    color: "#FFE600",
    strokeColor: "#000000",
    strokeWidth: 2,
    shinyWidth: 0,
    backgroundColor: null,
    align: "center",
    effect: null,
    animation: null,
    zOrder: 1
}

function App() {
    const [titles, setTitles] = useState<TitleItem[]>([firstTitle]);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedTitleItem = titles.find((titleItem) => titleItem.id === selectedId);

    function handleFieldChange(updatedTitleItem: TitleItem) {
        console.log("updatedTitleItem : ",  updatedTitleItem)
        setTitles((prevTitles) =>
            prevTitles.map((title) =>
                (title.id === updatedTitleItem.id ? updatedTitleItem : title)
            )
        );
    }

    return (
        <div className="app">
            <Header />
            <div className="app__main">
                <LayerList titles={titles} selectedTitleId={selectedId ?? null}
                           onSelect={setSelectedId} />

                <main className="stage">
                    {/* <Preview /> puis <Transport /> */}
                    <Timeline />
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
