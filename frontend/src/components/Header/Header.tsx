import styles from './Header.module.css';
import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext.tsx";
import {Button} from "../Button/Button.tsx";

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
                    {!isAuthenticated ? (
                        <>
                            <Button onClick={() => navigate('/login')}>
                                Войти
                            </Button>
                            <Button onClick={() => navigate('/register')}>
                                Зарегистрироваться
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color={'secondary'} onClick={() => navigate('/profile')}>
                                Личный кабинет
                            </Button>
                            <Button onClick={handleLogout}>
                                Выйти
                            </Button>
                        </>
                    )}
                </div>
            </nav>
            {
                children
            }
        </header>
    );
}