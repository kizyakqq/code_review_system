from fastapi import APIRouter

from app.config import settings

router = APIRouter(prefix='/models', tags=["models"])


@router.get('', response_model=dict)
async def get_llm_models():
    return {
        "models": settings.ALLOWED_LLM_MODELS
    }
