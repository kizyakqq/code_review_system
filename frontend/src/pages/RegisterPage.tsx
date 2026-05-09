import {useState, type SyntheticEvent} from "react";
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import {Header} from "../components/Header/Header";
import {Footer} from "../components/Footer/Footer";
import {Button} from "../components/Button/Button.tsx";
import {Input} from "../components/Input/Input.tsx";
import styles from "../styles/RegisterPage.module.css";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await register(username, email, password);
            navigate('/login');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Ошибка регистрации');
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
                    className={styles.registerForm}
                >
                    <h1 className={styles.h1}>Регистрация</h1>
                    <p className={styles.p}>Введите данные для регистрации</p>

                    <div className={styles.inputDiv}>
                        <Input
                            type="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className={styles.input}
                            placeholder="Имя пользователя"
                        />
                    </div>

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
                            className={styles.button}
                            color={'secondary'}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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