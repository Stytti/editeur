export interface TitleBoxProps {
    title: string;
    color: string;
    selectedTitle: string | null;
    handleClick: (title: string) => void;
}

export function TitleBox({ title, color, selectedTitle, handleClick }: TitleBoxProps) {
    return (
        <p style={{ color: color, cursor: "pointer",
            border: selectedTitle === title ? "1px solid "+color : "none" }}
            onClick={() => handleClick(title)}>
            {title}
        </p>
    );
}