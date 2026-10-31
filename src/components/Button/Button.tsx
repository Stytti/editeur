import './Button.css';
import type {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    text : string;
    disabled?: boolean;
    className?: string;
    onButtonClick: () => void;
}

export function Button({text, className, disabled, onButtonClick, ...rest}: ButtonProps) {
    return(
        <button type="button" className={`btn ${className ?? ""}`}
                disabled={disabled} onClick={onButtonClick} {...rest}>
            {text}
        </button>
    )
}