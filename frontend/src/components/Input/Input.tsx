import {type InputHTMLAttributes} from "react";
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input = ({children, className, ...props}: InputProps) => {
    const finalClass = `${styles.input} ${className || ''}`.trim();

    return (
        <input
            {...props}
            className={finalClass}
        />
    )
}