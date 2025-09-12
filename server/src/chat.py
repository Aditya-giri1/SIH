import os
import asyncio
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from datasets import load_dataset
from dotenv import load_dotenv
import aiohttp
from concurrent.futures import ThreadPoolExecutor
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# -------------------------
# Load environment variables
# -------------------------
load_dotenv()
API_KEY = os.getenv("API_KEY")
if not API_KEY:
    raise ValueError("Please set API_KEY in your .env file")
AI_PIPE_URL = "https://aipipe.org/openai/v1/chat/completions"

# -------------------------
# System prompt for neutral responses
# -------------------------
SYSTEM_PROMPT = (
    "You are a neutral AI assistant for student Q&A. "
    "Answer questions factually, concisely, and without inferring emotions or mental state. "
    "Do not provide advice or emotional support unless explicitly requested."
)

# -------------------------
# FastAPI setup
# -------------------------
app = FastAPI(title="Neutral Student Q&A RAG API")

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Paths and FAISS setup
# -------------------------
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
INDEX_PATH = os.path.join(DATA_DIR, "faiss.index")
CONV_PATH = os.path.join(DATA_DIR, "conversations_list.npy")
os.makedirs(DATA_DIR, exist_ok=True)

embed_model = SentenceTransformer('all-MiniLM-L6-v2')
dim = embed_model.get_sentence_embedding_dimension()

if os.path.exists(INDEX_PATH) and os.path.exists(CONV_PATH):
    index = faiss.read_index(INDEX_PATH)
    conversations_list = list(np.load(CONV_PATH, allow_pickle=True))
else:
    dataset = load_dataset("Amod/mental_health_counseling_conversations")
    # Extract only the raw text without counseling tone
    conversations_list = [x['Context'] for x in dataset['train']]

    embeddings = np.vstack([embed_model.encode(conversations_list[i:i+32]).astype('float32')
                            for i in range(0, len(conversations_list), 32)])

    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    faiss.write_index(index, INDEX_PATH)
    np.save(CONV_PATH, np.array(conversations_list))

executor = ThreadPoolExecutor(max_workers=4)

# -------------------------
# Pydantic model
# -------------------------
class QueryRequest(BaseModel):
    question: str
    top_k: Optional[int] = 3

# -------------------------
# FAISS retrieval (context only, neutral)
# -------------------------
async def async_retrieve(query: str, top_k: int = 3):
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(executor, retrieve, query, top_k)

def retrieve(query: str, top_k: int = 3):
    query_emb = embed_model.encode([query]).astype('float32')
    distances, indices = index.search(query_emb, top_k)
    # Only return plain text as context
    return [conversations_list[i] for i in indices[0]]

# -------------------------
# Safety check for crisis keywords
# -------------------------
def safety_check(question: str) -> Optional[str]:
    crisis_keywords = ["suicide", "kill myself", "self harm", "end my life", "die", "can't go on"]
    if any(word in question.lower() for word in crisis_keywords):
        return (
            "⚠️ It seems you may be in danger. "
            "Please reach out to a professional immediately:\n\n"
            "📞 India: AASRA Helpline +91-9820466726\n"
            "📞 USA: 988 Suicide & Crisis Lifeline\n"
            "📞 UK: Samaritans 116 123\n\n"
            "If you're in immediate danger, call emergency services."
        )
    return None

# -------------------------
# Generate answer (neutral)
# -------------------------
async def async_generate_answer(query: str, top_k: int = 3):
    relevant_convs = await async_retrieve(query, top_k)
    context = "\n\n".join(relevant_convs)

    prompt_messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Context:\n{context}\n\nUser Question: {query}\nAnswer:"}
    ]

    payload = {
        "model": "gpt-4.1-nano",
        "messages": prompt_messages,
        "temperature": 0.5
    }

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(AI_PIPE_URL, headers=headers, json=payload) as resp:
            if resp.status != 200:
                return f"AI Pipe error {resp.status}: {await resp.text()}"
            result = await resp.json()
            return result["choices"][0]["message"]["content"]

# -------------------------
# FastAPI endpoints
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

if __name__ == "__main__":
    uvicorn.run("chat:app", host="127.0.0.1", port=8001)
