from pydantic import BaseModel


class UserQueries(BaseModel):
    """User queries schema, for reference"""
    email: str
    query: str
    response: str
    timestamp: str
    thumb_up: bool
