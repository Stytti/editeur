import type {TitleItem} from "../App.tsx";
import {TitleBox} from "./TitleBox.tsx";

export interface TitleListProps {
    titles: TitleItem[];
    selectedTitle: string | null;
    setSelectedTitle: (title: string) => void;
}

export function TitleList({titles, selectedTitle, setSelectedTitle}: TitleListProps) {

    return(
        <div>
            {titles.map((title) => (
                <TitleBox key={title.id} title={title.text} color={title.color}
                          selectedTitle={selectedTitle}
                          handleClick={(title) => setSelectedTitle(title)} />
            ))}
        </div>
    )
}