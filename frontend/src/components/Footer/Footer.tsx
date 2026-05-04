import styles from './Footer.module.css';
import React from "react";
import {useNavigate} from "react-router-dom";

interface FooterProps {
    children?: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({children}) => {
    const navigate = useNavigate();

    return (
        <header className={styles.footer}>
            <nav className={styles.nav}>
                <button className={styles.logo} onClick={() => navigate('/')}>
                    Code Review
                </button>
            </nav>
            {children}
        </header>
    )
}