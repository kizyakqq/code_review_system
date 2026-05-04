import styles from './Header.module.css';
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";

interface HeaderProps {
    children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({children}) => {
    const {isAuthenticated, logout} = useAuth()
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}
            >
                <button className={styles.logo} onClick={() => navigate('/')}>
                    Code Review
                </button>
                <div className={styles.buttons}>
                    {isAuthenticated ? (
                        <>
                            <button onClick={() => navigate('/profile')}>
                                Личный кабинет
                            </button>
                            <button onClick={handleLogout}>
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => navigate('/login')}>
                                Войти
                            </button>
                            <button onClick={() => navigate('/register')}>
                                Зарегистрироваться
                            </button>
                        </>
                    )}
                </div>
            </nav>
            {
                children
            }
        </header>
    )
}