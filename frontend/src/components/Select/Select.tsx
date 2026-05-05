import {type ReactNode, type SelectHTMLAttributes} from "react";
import styles from './Select.module.css'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    children?: ReactNode;
}

export const Select = ({
                           children,
                           className,
                           ...props
                       }: SelectProps) => {
    const finalClass = `${styles.select} ${className || ''}`.trim()

    return (
        <select className={finalClass} {...props}>
            {children}
        </select>
    )
}