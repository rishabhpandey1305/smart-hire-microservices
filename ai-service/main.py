from ranking_models import (
    RankingRequest
)
from models import MatchRequest
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SKILLS_DATABASE = [
    "Java",
    "Spring Boot",
    "MySQL",
    "Docker",
    "React",
    "Python",
    "FastAPI",
    "JavaScript",
    "HTML",
    "CSS",
    "AWS",
    "Kubernetes",
    "MongoDB",
    "Git",
    "Microservices"
]

def extract_skills(text):

    found_skills = []

    for skill in SKILLS_DATABASE:

        if skill.lower() in text.lower():
            found_skills.append(skill)

    return found_skills


@app.get("/")
def home():
    return {
        "message": "Smart Hire AI Service Running"
    }

def calculate_match(candidate_skills, job_skills):

    matched_skills = []

    missing_skills = []

    for skill in job_skills:

        if skill.lower() in [
            s.lower()
            for s in candidate_skills
        ]:
            matched_skills.append(skill)

        else:
            missing_skills.append(skill)
            
        if len(job_skills) == 0:
            score = 0   
        else:
            score = (
                len(matched_skills)
                / len(job_skills)
            ) * 100

    return {
        "matchedSkills": matched_skills,
        "missingSkills": missing_skills,
        "matchScore": round(score, 2)
    }
    
    
@app.post("/parse-resume")
async def parse_resume(file: UploadFile):

    text = ""

    pdf_reader = PyPDF2.PdfReader(file.file)

    for page in pdf_reader.pages:

        extracted_text = page.extract_text()

        if extracted_text:
            text += extracted_text

    skills = extract_skills(text)

    return {
        "resumeText": text,
        "skills": skills
    }

@app.post("/match")
def match_candidate(
    request: MatchRequest):
    
    return calculate_match(
        request.candidateSkills,
        request.jobSkills
    )
    
@app.post("/rank-candidates")
def rank_candidates(
        request: RankingRequest):

    candidates = request.candidates

    sorted_candidates = sorted(
        candidates,
        key=lambda x: x.matchScore,
        reverse=True
    )

    ranked_list = []

    rank = 1

    for candidate in sorted_candidates:

        ranked_list.append({
            "rank": rank,
            "name": candidate.name,
            "matchScore":
                candidate.matchScore
        })

        rank += 1

    return ranked_list   