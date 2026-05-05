import {useState, type SyntheticEvent} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import styles from "../styles/LoginPage.module.css";
import {Button} from "../components/Button/Button.tsx";
import {Input} from "../components/Input/Input.tsx";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Ошибка авторизации');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header/>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className={styles.LoginForm}
                >
                    <h1 className={styles.h1}>Вход в аккаунт</h1>
                    <p className={styles.p}>Введите учётные данные для входа</p>

                    <div className={styles.inputDiv}>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="Email"
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="Пароль"
                        />
                    </div>

                    <div className={styles.inputDiv}>
                        <Button
                            type="submit"
                            className={styles.logInButton}
                            color={'secondary'}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Вход...' : 'Войти'}
                        </Button>
                    </div>

                    {error && (
                        <div className={styles.error}>
                            {error}
                        </div>
                    )}
                </form>
            </main>
            <Footer/>
        </>
    );
};