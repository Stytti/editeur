import './LayerListItem.css';

import {Button} from "../../../components/Button/Button.tsx";
import type {TitleItem} from "../../../model/montageSchema.ts";

interface LayerListItemProps {
    titleItem: TitleItem,
    isSelected: boolean,
    onSelect: (titleItemId: string) => void
}

export function LayerListItem({titleItem, isSelected, onSelect}: LayerListItemProps) {
    return (
      <Button className={`layer-list-item ${isSelected ? 'layer-list-item--selected' : ''}`}
              onButtonClick={() => onSelect(titleItem.id)}>
        {titleItem.text} ({titleItem.startTime}-{titleItem.endTime}s)
      </Button>
    );
}