# 🚀 Smart Hire – AI-Powered Recruitment Platform

Smart Hire is an AI-powered recruitment platform built using a **Microservices Architecture**. It streamlines the hiring process by allowing recruiters to create job postings, candidates to upload resumes, and an AI service to analyze resumes, extract skills, rank candidates, and calculate job match scores.

---

## 📌 Features

### 👨‍💼 Recruiter
- Secure Authentication (JWT)
- Create, Update, Delete Jobs
- View Applications
- AI-powered Candidate Ranking
- Resume Analysis
- Candidate Match Percentage

### 👨‍🎓 Candidate
- Register & Login
- Browse Available Jobs
- Apply for Jobs
- Upload Resume (PDF)
- View Application Status

### 🤖 AI Service
- Resume Parsing
- Skills Extraction
- Candidate Ranking
- Job Match Score Calculation
- Resume Analysis

---

# 🏗️ Architecture

```
                React Frontend
                       |
        -------------------------------
        |      |      |      |        |
      Auth   Job  Candidate  Application
       |       |      |          |
       ----------------------------
                    |
               MySQL Database

                    |
             FastAPI AI Service
```

---

# 🛠️ Tech Stack

## Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication
- Maven

## AI Service
- Python
- FastAPI
- Gemini API
- PDF Processing

## Database
- MySQL 8

## DevOps
- Docker
- Docker Compose

---

# 📂 Project Structure

```
smart-hire-microservices/

│
├── auth-service/
├── job-service/
├── candidate-service/
├── application-service/
├── ai-service/
├── smart-hire-frontend/
├── mysql-init/
├── docker-compose.yml
└── README.md
```

---

# 📦 Microservices

## 1. Authentication Service

Port: **8081**

Responsibilities

- User Registration
- Login
- JWT Token Generation
- Authentication

---

## 2. Job Service

Port: **8082**

Responsibilities

- Create Job
- Update Job
- Delete Job
- List Jobs

---

## 3. Candidate Service

Port: **8083**

Responsibilities

- Candidate Profile
- Resume Upload
- Candidate Details

---

## 4. Application Service

Port: **8084**

Responsibilities

- Apply for Job
- Track Applications
- Recruiter Application Management

---

## 5. AI Service

Port: **8000**

Responsibilities

- Resume Parsing
- Resume Analysis
- Skills Extraction
- Candidate Ranking
- Match Percentage

---

## 6. Frontend

Port: **3000**

Built using React + Vite.

---

# 🗄️ Database

The project uses **MySQL** with separate databases for each service.

| Service | Database |
|----------|-----------|
| Auth Service | auth_db |
| Job Service | job_db |
| Candidate Service | candidate_db |
| Application Service | application_db |

---

# 🔌 Service Ports

| Service | Port |
|----------|------|
| Frontend | 3000 |
| AI Service | 8000 |
| Auth Service | 8081 |
| Job Service | 8082 |
| Candidate Service | 8083 |
| Application Service | 8084 |
| MySQL | 3307 |

---

# ⚙️ Prerequisites

- Java 17+
- Maven
- Node.js 20+
- Python 3.11+
- Docker Desktop
- MySQL (optional if using Docker)

---

# 🚀 Running with Docker

Clone the repository

```bash
git clone https://github.com/yourusername/smart-hire-microservices.git

cd smart-hire-microservices
```

Build and start all services

```bash
docker-compose up --build
```

Stop containers

```bash
docker-compose down
```

---

# 💻 Running Locally

## 1. Start MySQL

Create databases:

```
auth_db
job_db
candidate_db
application_db
```

---

## 2. Start Spring Boot Services

For each service:

```bash
cd auth-service
./mvnw spring-boot:run
```

Repeat for

- job-service
- candidate-service
- application-service

---

## 3. Start AI Service

```bash
cd ai-service

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Open

```
http://localhost:8000/docs
```

---

## 4. Start Frontend

```bash
cd smart-hire-frontend/smart-hire-frontend

npm install

npm run dev
```

---

# 🌐 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Jobs

```
GET /api/jobs

POST /api/jobs

PUT /api/jobs/{id}

DELETE /api/jobs/{id}
```

---

## Candidates

```
POST /api/candidates/upload

GET /api/candidates
```

---

## Applications

```
POST /api/applications

GET /api/applications
```

---

## AI Service

```
POST /analyze-resume

POST /rank-candidates
```

---

# 🔐 Authentication

The backend uses **JWT Authentication**.

Example Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📷 Screenshots

Add screenshots here:

- Login Page
- Dashboard
- Job Listings
- Resume Upload
- Candidate Ranking
- AI Analysis

---

# 📈 Future Improvements

- Email Notifications
- Interview Scheduling
- AI Chatbot
- Resume Recommendation
- Skill Gap Analysis
- Analytics Dashboard
- Kubernetes Deployment
- CI/CD Pipeline

---

# 👨‍💻 Author

**Rishabh Pandey**

Final Year B.Tech (Information Technology)

---

# 📄 License

This project is developed for educational and learning purposes.
