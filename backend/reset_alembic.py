# reset_alembic.py
import asyncio
from sqlalchemy import create_engine, text

from app.config import settings

DATABASE_URL = settings.database_url


def reset_alembic():
    engine = create_engine(DATABASE_URL)
    with engine.connect() as conn:
        # Вариант А: Полная очистка (удалит ВСЕ данные!)
        conn.execute(text("DROP SCHEMA public CASCADE; CREATE SCHEMA public;"))

        # Вариант Б: Только сброс версий алемика (безопасно)
        # conn.execute(text("DELETE FROM alembic_version;"))
        # conn.commit()
        # print("✅ alembic_version очищена!")
        #
        # # Проверка
        # result = conn.execute(text("SELECT version_num FROM alembic_version;"))
        # print(f"📋 Текущая версия: {result.scalar()}")

    engine.dispose()


if __name__ == "__main__":
    reset_alembic()