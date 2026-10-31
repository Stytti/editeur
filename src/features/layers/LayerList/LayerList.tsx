import './LayerList.css';
import {Button} from "../../../components/Button/Button.tsx";
import type {TitleItem} from "../../../types/TitleItem.ts";
import {LayerListItem} from "../LayerListItem/LayerListItem.tsx";

interface LayerListProps {
    titles: TitleItem[],
    selectedTitleId: string|null,
    onSelect: (titleItemId: string) => void
}

export function LayerList({ titles, selectedTitleId, onSelect }: LayerListProps) {

    const sortedTitleItems = [...titles].sort(
        (a, b) => a.startTime - b.startTime
    );

    const onDuplicate = () => {
        console.log("Duplicate clicked");
    }

    const onDelete = () => {
        console.log("Delete clicked");
    }

    return (
        <div className="flex-column flex-auto">
            <h2 className="panel-heading">Titres (z-order)</h2>

            <ul className="layer-list">
                {sortedTitleItems.map(titleItem => (
                    <li key={titleItem.id}>
                        <LayerListItem titleItem={titleItem} isSelected={titleItem.id === selectedTitleId} onSelect={onSelect} />
                    </li>
                ))}
            </ul>

            <p className="hint">
                Le haut de la liste est au premier plan. Le dernier élément du tableau est dessiné en dernier.
            </p>

            <div className="sidebar__footer">
                <Button text="Dupliquer" className="btn--block" disabled={!selectedTitleId} onButtonClick={onDuplicate} />
                <Button text="Supprimer" className="btn--block btn--danger" disabled={!selectedTitleId} onButtonClick={onDelete} />
            </div>
        </div>
    );
}