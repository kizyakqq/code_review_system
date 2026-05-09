import {type InputHTMLAttributes, forwardRef} from "react";
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({className, ...props}, ref) => {  // ← Оборачиваем в (props, ref) => {}
        const finalClass = `${styles.input} ${className || ''}`.trim();

        return (
            <input
                ref={ref}
                className={finalClass}
                {...props}
            />
        );
    }
);