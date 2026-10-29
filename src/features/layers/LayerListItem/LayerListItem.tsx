import './LayerListItem.css';

import type {TitleItem} from "../../../types/TitleItem.tsx";

interface LayerListItemProps {
    titleItem: TitleItem,
    selectedTitleId: string|null,
    onSelect: (titleItemId: string) => void
}

export function LayerListItem({titleItem, selectedTitleId, onSelect}: LayerListItemProps) {
    return (
        <p className={`layer-list-item ${titleItem.id === selectedTitleId ? 'layer-list-item--selected' : ''}`}
           onClick={() => onSelect(titleItem.id)}>
            <span>{titleItem.text}</span> <span>{titleItem.startTime}-{titleItem.endTime} s</span>
        </p>
    );
}