import './LayerListItem.css';

import type {TitleItem} from "../../../types/TitleItem.ts";
import {Button} from "../../../components/Button/Button.tsx";

interface LayerListItemProps {
    titleItem: TitleItem,
    isSelected: boolean,
    onSelect: (titleItemId: string) => void
}

export function LayerListItem({titleItem, isSelected, onSelect}: LayerListItemProps) {
    return (
      <Button className={`layer-list-item ${isSelected ? 'layer-list-item--selected' : ''}`}
              text={`${titleItem.text} (${titleItem.startTime}-${titleItem.endTime}s)`}
              onButtonClick={() => onSelect(titleItem.id)} />
    );
}