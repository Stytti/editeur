import './Button.css';

interface ButtonProps {
    text : string;
    disabled?: boolean;
    className?: string;
    onButtonClick: () => void;
}
export function Button({text, className, disabled, onButtonClick}: ButtonProps) {
    return(
        <button type="button" className={`btn ${className}`}
                disabled={disabled} onClick={onButtonClick}>{text}</button>
    )
}