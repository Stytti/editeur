import './LayerList.css';
import {Button} from "../../../components/Button/Button.tsx";
import {LayerListItem} from "../LayerListItem/LayerListItem.tsx";
import type {TitleItem} from "../../../model/montageSchema.ts";

interface LayerListProps {
    titles: TitleItem[],
    selectedTitleId: string|null,
    onSelect: (titleItemId: string) => void,
    onDuplicate: () => void,
    onDelete: () => void
}

export function LayerList({ titles, selectedTitleId, onSelect, onDuplicate, onDelete }: LayerListProps) {
    const sortedTitleItems = [...titles].sort(
        (a, b) => a.startTime - b.startTime
    );

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