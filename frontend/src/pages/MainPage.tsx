import {Header} from "../components/Header/Header.tsx";
import styles from "../styles/MainPage.module.css";
import {Button} from "../components/Button/Button.tsx";
import {Footer} from "../components/Footer/Footer.tsx";
import {Select} from "../components/Select/Select.tsx";
import {type ChangeEvent, type SyntheticEvent, useEffect, useRef, useState} from "react";
import {modelsAPI, reviewAPI} from "../services/api.ts";
import {Input} from "../components/Input/Input.tsx";
import type {Review} from "../types";
import {formatReviewResult} from '../utils/formatters'

export default function MainPage() {
    const [selectedModel, setSelectedModel] = useState<string>('Выберите модель');
    const [availableModels, setAvailableModels] = useState<string[]>([]);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewResult, setReviewResult] = useState<Review | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const {data} = await modelsAPI.get();
                setAvailableModels(data.models);
            } catch (err) {
                console.error('Ошибка загрузки моделей', err)
            }
        };
        fetchModels();
    }, [])

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file || !selectedModel) return;

        setIsLoading(true);
        setError('');
        setReviewResult(null);

        try {
            const {data} = await reviewAPI.upload(file, selectedModel);
            console.log(data);

            setReviewResult(data);
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Ошибка при загрузке');
        } finally {
            setIsLoading(false);
        }
    }

    const handleClear = () => {
        setFile(null);
        setError('');
        setSelectedModel('');

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    return (
        <>
            <Header/>
            <main>
                <form
                    onSubmit={handleSubmit}
                    className={styles.form}
                >
                    <h1 className={styles.h1}>Авторецензирование кода с помощью LLM</h1>


                    <div className={styles.inputDiv}>
                        <div className={styles.fileInputWrapper}>
                            <Input
                                required
                                type="file"
                                id="file-upload"
                                accept=".py"
                                onChange={handleFileChange}
                                className={styles.fileInput}
                            />

                            <label htmlFor="file-upload" className={styles.fileLabel}>
                                {!file ? (
                                    <div>Выбрать файл</div>
                                ) : (
                                    <div>📄 {file.name}</div>
                                )}
                            </label>
                        </div>
                        <Select
                            required
                            value={selectedModel}
                            onChange={(e) => setSelectedModel(e.target.value)}
                        >
                            <option value={''} hidden>Выберите модель</option>
                            {availableModels.length === 0 ? (
                                <option disabled>Загрузка моделей...</option>
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
                                <pre className={styles.textarea}>
                                    {isLoading
                                        ? 'Анализ кода... Пожалуйста, подождите.'
                                        : reviewResult
                                            ? formatReviewResult(reviewResult)
                                            : 'Загрузите файл, выберите модель и нажмите "Получить ревью".'
                                    }
                                </pre>
                    </div>

                    <div className={styles.inputDiv}>
                        <Button onClick={handleClear}>
                            Очистить
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading || !file}
                            color={"secondary"}
                        >
                            {isLoading ? 'Анализ кода...' : 'Получить ревью'}
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
    )
        ;
}