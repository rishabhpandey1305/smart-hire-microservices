from pydantic import BaseModel

class MatchRequest(BaseModel):
    candidateSkills: list[str]
    jobSkills: list[str]