from pydantic import BaseModel

class CandidateScore(BaseModel):
    name: str
    matchScore: float

class RankingRequest(BaseModel):
    candidates: list[CandidateScore]