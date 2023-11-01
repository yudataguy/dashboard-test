import json
import logging
import subprocess
from typing import Any

import openai
from elasticsearch import Elasticsearch
from fastapi import Body, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.errors import PyMongoError

openai.api_key = "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"

es_client = Elasticsearch([{"host": "localhost", "port": 9200, "scheme": "http"}])


def pretty_response(response):
    """Make elasticsearch response pretty"""
    for hit in response["hits"]["hits"]:
        search_id = hit["_id"]
        score = hit["_score"]
        title = hit["_source"]["title"]
        text = hit["_source"]["text"]
        pretty_output = (
            f"\nID: {search_id}\nTitle: {title}\nSummary: {text}\nScore: {score}"
        )
        print(pretty_output)


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


@app.get("/user_queries_list")
def get_saved_user_queries(page: int = 1, limit: int = 10):
    """retrieve saved user queries for analysis"""

    user_query_list = []
    total_queries = user_queries.count_documents({})

    for query in user_queries.find().skip((page - 1) * limit).limit(limit):
        user_query_list.append(query)

    return {
        "success": True,
        "data": user_query_list,
        "total_queries": total_queries,
        "current_page": page,
        "total_pages": (total_queries // limit) + 1,
    }


@app.post("/test_query")
async def retrieval_part_result(req: Request):
    """Test retrieval part of the pipeline"""

    req = await req.json()

    query = req.get("query")

    # print(query)

    result = es_client.search(
        index="edi",
        body={
            "size": 10,
            "_source": {"includes": ["element_ja", "value", "value_full_ja"]},
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": query,
                                "fields": ["element_ja.ngram^1"],
                                "type": "phrase",
                            }
                        }
                    ]
                }
            },
        },
    )

    return {"success": True, "result": result}


@app.post("/prompt_engineering")
async def create_prompt(req: Request):
    req_body = await req.json()

    systemPrompt = req_body["systemPrompt"]
    query = req_body["query"]

    context_results = es_client.search(
        index="edi",
        body={
            "size": 10,
            "_source": {"includes": ["element_ja", "value", "value_full_ja"]},
            "query": {
                "bool": {
                    "should": [
                        {
                            "multi_match": {
                                "query": query,
                                "fields": ["element_ja.ngram^1"],
                                "type": "phrase",
                            }
                        }
                    ]
                }
            },
        },
    )

    context = context_results.get("hits").get("hits")
    paragraph = " ".join([hit["_source"]["value_full_ja"] for hit in context])

    query = f"コンテクスト: {paragraph}\n質問: {query}\n回答:"

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
