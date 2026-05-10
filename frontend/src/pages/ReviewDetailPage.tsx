import styles from "../styles/ReviewDetailPage.module.css"
import type {Review} from "../types";
import {reviewAPI} from "../services/api.ts";
import {useEffect, useState} from "react";
import {Footer} from "../components/Footer/Footer.tsx";
import {Header} from "../components/Header/Header.tsx";
import {formatReviewResult} from "../utils/formatters.ts";
import {Button} from "../components/Button/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";

export default function ReviewDetailPage() {
    const navigate = useNavigate();
    const {id} = useParams<{id: string}>();

    const [review, setReview] = useState<Review | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);



    useEffect(() => {
        if (!id) return;

        const fetchReview = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const {data}: { data: Review } = await reviewAPI.getById(Number(id));
                setReview(data);
            } catch
                (err: any) {
                setError(err.response?.data?.detail || 'Ошибка при загрузке');
            } finally {
                setIsLoading(false);
            }
        };
        fetchReview();
    }, [id]);

    const handleDelete = async () => {
        if (!id || !window.confirm('Удалить это ревью? Это действие нельзя отменить.')) return;

        try {
            await reviewAPI.delete(Number(id));
            navigate('/profile');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Ошибка при удалении');
        }
    }

    if (!id) {
        return <p className={styles.error}>ID ревью не указан в адресной строке.</p>;
    }

    return (
        <>
            <Header/>
            <main>
                {isLoading ? (
                    <h1 className={styles.h1}>Загрузка данных...</h1>
                ) : error ? (
                    <div>
                        <h1 className={styles.h1}>❌ {error}</h1>
                        <Button color="secondary" onClick={() => navigate('/profile')}>
                            Вернуться в профиль
                        </Button>
                    </div>
                ) : review ? (
                    <div className={styles.container}>
                        <h1 className={styles.h1}>Ревью #{review.id}</h1>
                        <h2 className={styles.h2}>
                            Имя файла: <strong>{review.filename}</strong>.
                            Модель: <strong>{review.model_name}</strong>.
                        </h2>
                        <pre className={styles.textarea}>
                            {formatReviewResult(review)}
                        </pre>
                        <div className={styles.inputDiv}>
                            <Button onClick={() => navigate(-1)}>Назад</Button>
                            <Button color={'secondary'} onClick={handleDelete}>
                                Удалить
                            </Button>
                        </div>
                    </div>
                ) : null}
            </main>
            <Footer/>
        </>
    )
}