// import {useAuth} from '../context/AuthContext';
import {Header} from "../components/Header/Header.tsx";
import styles from "../styles/MainPage.module.css";
import {Button} from "../components/Button/Button.tsx";
import {Footer} from "../components/Footer/Footer.tsx";
// import {Link} from "react-router-dom";
import {Select} from "../components/Select/Select.tsx";
import {useEffect, useState} from "react";
import {reviewAPI} from "../services/api.ts";

export default function MainPage() {
    // const {isAuthenticated} = useAuth();
    const [selectedModel, setSelectedModel] = useState<string>('Выберите модель');
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    // const [error, setError] = useState('');

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const {data} = await reviewAPI.getModels();
                setAvailableModels(data.models);
                if (data.models.length > 0) setSelectedModel(data.models[0]);
            } catch (err) {
                console.error('Ошибка загрузки моделей', err)
            }
        };
        fetchModels();
    }, [])

    return (
        <>
            <Header/>
            <main>
                <form
                    className={styles.form}
                >
                    <h1 className={styles.h1}>Авторецензирование кода с помощью LLM</h1>

                    {/*{{isAuthenticated ? }
                        <>*/}
                            <div className={styles.inputDiv}>
                                <Button>
                                    Загрузить файл
                                </Button>
                                <Select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    {availableModels.length === 0 ? (
                                        <option>Загрузка моделей...</option>
                                    ) : (
                                        availableModels.map(model => (
                                            <option key={model} value={model}>
                                                {model}
                                            </option>
                                        ))
                                    )}
                                </Select>
                            </div>

                            <div className={styles.inputDiv}>
                                <textarea></textarea>
                            </div>

                            <div className={styles.inputDiv}>
                                <Button>
                                    Очистить
                                </Button>
                                <Button color={"secondary"}>
                                    Получить ревью
                                </Button>
                            </div>
                       {/* </>

                    ) : (
                        <>
                            <p className={styles.p}>
                                Для использования системы{' '}
                                <Link
                                    to='/login'
                                    className={styles.link}
                                >Войдите</Link>
                                {' '}или{' '}
                                <Link
                                    to='/register'
                                    className={styles.link}
                                >
                                    Зарегистрируйтесь
                                </Link>
                            </p>
                        </>
                    )}*/}
                </form>
            </main>
            <Footer/>
        </>
    )
        ;
}