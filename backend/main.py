import subprocess
from typing import Any
import json
import openai
from fastapi import Body, FastAPI, Request
from pymongo import MongoClient
from pymongo.errors import PyMongoError
from fastapi.middleware.cors import CORSMiddleware
import logging

openai.api_key = "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"

# Initialize FastAPI and MongoDB Client
app = FastAPI(root_path="/api")

# Set up CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://root:bunsho@localhost:27017/")
db = client["internal_dashboard"]

# Collections
user_queries = db["user_queries"]
test_query = db["test_query"]
prompt_engineering = db["prompt_engineering"]
test_history = db["test_history"]


@app.post("/user_queries")
async def create_user_query(query: str = Body(...)):
    new_entry = {"query": query}
    user_queries.insert_one(new_entry)
    return {"message": "User query added", "query": query}


@app.post("/test_query")
async def create_test_query(query: Any = Body(...)):
    new_entry = {"query": query}
    test_query.insert_one(new_entry)
    return {"message": "Test query added", "query": query}


@app.post("/prompt_engineering")
async def create_prompt(req: Request):
    req_body = await req.json()

    systemPrompt = req_body["systemPrompt"]
    query = req_body["query"]

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": systemPrompt},
            {"role": "user", "content": query},
            # {
            #     "role": "assistant",
            #     "content": "The Los Angeles Dodgers won the World Series in 2020.",
            # },
            # {"role": "user", "content": "Where was it played?"},
        ],
    )

    new_entry = {
        "prompt": systemPrompt,
        "query": query,
        "response": json.dumps(response["choices"][0]["message"]["content"]),
    }

    logging.info(f"New entry: {new_entry}")

    try:
        prompt_engineering.insert_one(json.loads(json.dumps(new_entry)))
    except PyMongoError as e:
        return {
            "success": False,
            "message": "An error occurred while adding the query",
            "error": str(e),
        }

    return {"success": True, "data": new_entry}


@app.post("/test_history")
async def create_test_history(query: Any = Body(...)):
    new_entry = {"query": query}
    test_history.insert_one(new_entry)
    return {"message": "Test history added", "query": query}


if __name__ == "__main__":
    subprocess.run(
        ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
    )
