from ranking_models import RankingRequest
from models import MatchRequest
from fastapi import FastAPI, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import logging

# ---------------- Logging ----------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# ---------------- FastAPI App ----------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://smart-hire-microservices-iufo-lmxsko23e.vercel.app",
        "https://smart-hire-microservices-iufo.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Skills Database ----------------
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


# ---------------- Home ----------------
@app.get("/")
def home():

    logger.info("AI Service is running")

    return {
        "message": "Smart Hire AI Service Running"
    }


# ---------------- Match Calculation ----------------
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


# ---------------- Resume Parsing ----------------
@app.post("/parse-resume")
async def parse_resume(file: UploadFile):

    logger.info("Resume uploaded: %s", file.filename)

    text = ""

    pdf_reader = PyPDF2.PdfReader(file.file)

    for page in pdf_reader.pages:

        extracted_text = page.extract_text()

        if extracted_text:
            text += extracted_text

    skills = extract_skills(text)

    logger.info(
        "Resume parsed successfully. Skills found: %d",
        len(skills)
    )

    return {
        "resumeText": text,
        "skills": skills
    }


# ---------------- Candidate Matching ----------------
@app.post("/match")
def match_candidate(request: MatchRequest):

    logger.info("Matching candidate with job")

    result = calculate_match(
        request.candidateSkills,
        request.jobSkills
    )

    logger.info(
        "Match score calculated: %.2f%%",
        result["matchScore"]
    )

    return result


# ---------------- Candidate Ranking ----------------
@app.post("/rank-candidates")
def rank_candidates(request: RankingRequest):

    logger.info(
        "Ranking %d candidates",
        len(request.candidates)
    )

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
            "matchScore": candidate.matchScore
        })

        rank += 1

    logger.info("Candidate ranking completed successfully")

    return ranked_list