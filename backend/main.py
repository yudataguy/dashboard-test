"""Fastapi backend server for the internal dashboard"""

import json
import logging
import os
import subprocess
from datetime import datetime
from decimal import Decimal

import openai
from dynamodb_manager import DynamoDBManager
from elasticsearch import Elasticsearch
from fastapi import FastAPI, Request
from magentic import FunctionCall, prompt
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)


class ReturnObj(BaseModel):
    """Return object for query keywords"""

    date: int
    keywords: list[str]


def extract_keywords(date: int, keywords: list[str]) -> ReturnObj:
    """Extract keywords from text"""
    return ReturnObj(date=date, keywords=keywords)


@prompt("クエリから日付とキーワードを抽出して: {sentence}", functions=[extract_keywords])
def extract(sentence: str) -> FunctionCall[ReturnObj]:
    ...


openai.api_key = os.getenv("OPENAI_API_KEY")
# print(openai.api_key)

# print("running in container!!")
elastic_host = "elasticsearch"

# Initialize FastAPI and MongoDB + ElasticSearch Client
app = FastAPI(root_path="/api")

es_client = Elasticsearch([{"host": elastic_host, "port": 9200, "scheme": "http"}])

# DynamoDB tables
prompt_engineering = DynamoDBManager(table_name="internal-dashboard-prompt-test")
retrieval_test_history = DynamoDBManager(table_name="internal-table-query-history")


# @app.get("/user_queries_list")
# def get_saved_user_queries(page: int = 1, limit: int = 10):
#     """retrieve saved user queries for analysis"""

#     user_query_list = []
#     total_queries = user_queries.count_documents({})

#     for query in (
#         user_queries.find({}, {"_id": 0}).skip((page - 1) * limit).limit(limit)
#     ):
#         user_query_list.append(query)

#     return {
#         "success": True,
#         "data": user_query_list,
#         "total_queries": total_queries,
#         "current_page": page,
#         "total_pages": (total_queries // limit) + 1,
#     }


@app.post("/test_query")
async def retrieval_part_result(req: Request):
    """Test retrieval part of the pipeline"""

    req = await req.json()

    query = req.get("query")

    query = extract(query)()

    print("OUTPUT: ", query)

    query = " ".join(query.keywords)
    print("PROCESSED QUERY: ", query)

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

    result = result.get("hits").get("hits")

    formatted_list = [
        {
            "value": item["_source"]["value"],
            "column": item["_source"]["element_ja"],
            "full_value": item["_source"]["value_full_ja"],
            "score": item["_score"],
        }
        for item in result
    ]

    formatted_list_with_query = [
        {
            "value": item["_source"]["value"],
            "column": item["_source"]["element_ja"],
            "full_value": item["_source"]["value_full_ja"],
            "score": Decimal(str(item["_score"])),
            "query": str(query),
            "timestamp": str(datetime.now()),
        }
        for item in result
    ]

    print(formatted_list_with_query)

    try:
        retrieval_test_history.put_items(formatted_list_with_query)
    except Exception as e:
        return {
            "success": False,
            "message": "An error occurred while adding the query",
            "error": str(e),
        }

    return {"success": True, "result": {"list": formatted_list, "query": str(query)}}


@app.get("/test_query_history")
async def get_test_history(limit: int = 100):
    """Test history endpoint"""

    res = retrieval_test_history.scan_table(page_size=limit)

    print(res)

    return {"success": True, "result": res}


@app.post("/prompt_engineering")
async def create_prompt(req: Request):
    req_body = await req.json()

    systemPrompt = req_body["systemPrompt"]
    query = req_body["query"]

    query = extract(query)()

    print("OUTPUT: ", query)

    query = " ".join(query.keywords)
    print("PROCESSED QUERY: ", query)

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
    # print(paragraph)

    query = f"コンテクスト: {paragraph}\n質問: {query}\n回答:"

    response = openai.ChatCompletion.create(
        model="gpt-4",
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

    gpt_response = response["choices"][0]["message"]["content"]
    print(gpt_response)

    new_entry = {
        "prompt": systemPrompt,
        "query": query,
        "response": gpt_response,
        "timestamp": str(datetime.now()),
    }

    logging.info("New entry: %s", new_entry)

    try:
        prompt_engineering.put_item(json.loads(json.dumps(new_entry)))
    except Exception as e:
        return {
            "success": False,
            "message": "An error occurred while adding the query",
            "error": str(e),
        }

    return {"success": True, "data": new_entry}


if __name__ == "__main__":
    subprocess.run(
        ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
    )
