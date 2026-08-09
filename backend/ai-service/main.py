from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import PyPDF2
import google.generativeai as genai
import os
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://smart-hire-microservices-1-57uq.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Gemini setup
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-2.5-flash")

@app.get("/")
def home():
    return {"message": "Smart Hire AI Service Running"}

@app.post("/parse-resume")
async def parse_resume(file: UploadFile):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    try:
        text = ""

        pdf_reader = PyPDF2.PdfReader(file.file)

        for page in pdf_reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\\n"

        if not text.strip():
            raise HTTPException(status_code=400, detail="Unable to extract text from PDF")

        prompt = f"""
Analyze this resume and return ONLY valid JSON.

Required JSON format:
{{
  "skills": ["skill1", "skill2"],
  "experienceLevel": "Beginner|Intermediate|Advanced",
  "yearsOfExperience": 0,
  "overallScore": 0,
  "strengths": ["..."],
  "weaknesses": ["..."],
  "recommendation": "..."
}}

Resume:
{text}
"""

        response = model.generate_content(prompt)

        raw = response.text.strip()

        # Remove markdown fences if Gemini adds them
        raw = raw.replace("```json", "").replace("```", "").strip()

        ai_data = json.loads(raw)

        return {
            "resumeText": text,
            **ai_data
        }

    except json.JSONDecodeError:
        logger.exception("Failed to parse Gemini JSON response")
        raise HTTPException(status_code=500, detail="AI returned invalid JSON")

    except Exception as e:
        logger.exception("Resume analysis failed")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/match")
def match_candidate(request: dict):

    candidate_skills = request.get("candidateSkills", [])
    job_skills = request.get("jobSkills", [])

    matched = []
    missing = []

    for skill in job_skills:
        if skill.lower() in [s.lower() for s in candidate_skills]:
            matched.append(skill)
        else:
            missing.append(skill)

    score = (len(matched) / len(job_skills) * 100) if job_skills else 0

    return {
        "matchedSkills": matched,
        "missingSkills": missing,
        "matchScore": round(score, 2)
    }


@app.post("/rank-candidates")
def rank_candidates(request: dict):

    candidates = request.get("candidates", [])

    sorted_candidates = sorted(
        candidates,
        key=lambda x: x.get("matchScore", 0),
        reverse=True
    )

    ranked = []

    for index, candidate in enumerate(sorted_candidates, start=1):
        ranked.append({
            "rank": index,
            "name": candidate.get("name"),
            "matchScore": candidate.get("matchScore", 0)
        })

    return ranked