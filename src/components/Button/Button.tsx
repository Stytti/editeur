import './Button.css';
import type {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    disabled?: boolean;
    className?: string;
    onButtonClick: () => void;
}

export function Button({children, className, disabled, onButtonClick, ...rest}: ButtonProps) {
    return(
        <button type="button" className={`btn ${className ?? ""}`}
                disabled={disabled} onClick={onButtonClick} {...rest}>
            {children}
        </button>
    )
}
