import {Header} from "../components/Header/Header.tsx";
import {Footer} from "../components/Footer/Footer.tsx";
import {useAuth} from "../context/AuthContext.tsx";
import styles from "../styles/ProfilePage.module.css"
import {Button} from "../components/Button/Button.tsx";
import {useEffect, useState} from "react";
import type {Review, ReviewListResponse} from "../types";
import {reviewAPI} from "../services/api.ts";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [reviewList, setReviewList] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalReviews, setTotalReviews] = useState(0);

    const fetchReviews = async (page: number = 1) => {
        setIsLoading(true);
        try {
            const {data}: { data: ReviewListResponse } = await reviewAPI.getList(page);
            setReviewList(data.items);
            setTotalReviews(data.total);
            setTotalPages(Math.ceil(data.total / data.page_size));
            setCurrentPage(data.page);
        } catch (err) {
            console.error('Ошибка загрузки ревью', err)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews(currentPage);
    }, [currentPage]);

    const handleViewDetails = (reviewId: number) => {
        navigate(`/reviews/${reviewId}`);
    }

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        setCurrentPage(newPage);
    }

    return (
        <>
            <Header/>
            <main>
                <h1 className={styles.h1}>Личный кабинет</h1>
                <h2 className={styles.h2}>Мои данные:</h2>
                <p className={styles.p}>ID: <strong className={styles.strong}>{user?.id}</strong>. Имя
                    пользователя: <strong className={styles.strong}>{user?.username}</strong>. Email: <strong
                        className={styles.strong}>{user?.email}</strong>.</p>
                <h2 className={styles.h2}>Мои ревью:</h2>

                <div className={styles.reviews}>
                    {isLoading ? (
                        <div className={styles.inputDiv}>
                            <p>Загрузка...</p>
                        </div>
                    ) : reviewList.length === 0 ? (
                        <div className={styles.inputDiv}>
                            <p>Пока нет ревью</p>
                        </div>
                    ) : (
                        <>
                            {reviewList.map((review: Review) => (
                                <div key={review.id} className={styles.inputDivReviews}>
                                    <p>
                                        ID: {review.id}.
                                        Файл: {review.filename}.
                                        Модель: {review.model_name}
                                    </p>
                                    <Button onClick={() => handleViewDetails(review.id)}>
                                        Подробнее
                                    </Button>
                                </div>
                            ))}
                            <div className={styles.pagination}>
                                <Button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    color="secondary"
                                >
                                    Назад
                                </Button>

                                <span className={styles.pageInfo}>
                                    Страница {currentPage} из {totalPages}
                                    {totalReviews > 0 && ` (всего: ${totalReviews})`}
                                </span>

                                <Button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    color="secondary"
                                >
                                    Вперёд
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </main>
            <Footer/>
        </>
    )
}