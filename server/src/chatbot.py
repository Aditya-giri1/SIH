from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import aiohttp
import os
from dotenv import load_dotenv

# -------------------------
# Load API key
# -------------------------
load_dotenv()
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("Please set API_KEY in your .env file")

AI_PIPE_URL = "https://aipipe.org/openai/v1/chat/completions"
SYSTEM_PROMPT = "You are a helpful neutral assistant. Only answer what is asked."

# -------------------------
# FastAPI setup
# -------------------------
app = FastAPI(title="Neutral Student Q&A RAG API")

# Allow frontend at localhost:5173
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Request model
# -------------------------
class QueryRequest(BaseModel):
    question: str
    top_k: int = 3

# -------------------------
# Safety check (example)
# -------------------------
def safety_check(question: str):
    crisis_keywords = ["suicide", "self harm", "kill myself", "end my life"]
    if any(word in question.lower() for word in crisis_keywords):
        return (
            "⚠️ It sounds like you may be in danger. "
            "Please contact a professional immediately or call a local helpline."
        )
    return None

# -------------------------
# AIpipe query function
# -------------------------
async def async_generate_answer(query: str, top_k: int = 3):
    payload = {
        "model": "gpt-4.1-nano",
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": query}
        ],
        "temperature": 0.5
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(AI_PIPE_URL, headers=headers, json=payload) as resp:
            if resp.status != 200:
                error_text = await resp.text()
                return f"AI Pipe error {resp.status}: {error_text}"
            result = await resp.json()
            return result["choices"][0]["message"]["content"]

# -------------------------
# Endpoints
# -------------------------
@app.post("/query")
async def post_query(request: QueryRequest):
    crisis_response = safety_check(request.question)
    if crisis_response:
        return {"question": request.question, "answer": crisis_response, "escalated": True}

    answer = await async_generate_answer(request.question, request.top_k)
    return {"question": request.question, "answer": answer, "escalated": False}

@app.get("/query")
async def get_query(q: str, top_k: int = 3):
    crisis_response = safety_check(q)
    if crisis_response:
        return {"question": q, "answer": crisis_response, "escalated": True}

    answer = await async_generate_answer(q, top_k)
    return {"question": q, "answer": answer, "escalated": False}

# -------------------------
# Run
# -------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8001, reload=True)
