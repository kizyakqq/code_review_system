import {type ButtonHTMLAttributes, type ReactNode} from 'react';
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary' | 'secondary',
    children?: ReactNode
}

export const Button = ({
                           children,
                           color = 'primary',
                           className,
                           ...props
                       }: ButtonProps) => {
    const finalClass = `${styles.button} ${styles[color]} ${className || ''}`.trim();

    return (
        <button
            className={finalClass}
            {...props}
        >
            {children}
        </button>
    )
};