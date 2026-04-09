# Gauriksha Bank — Full Stack Banking Application

A full-stack banking application with AI-powered fraud detection, 
built as a final year project.

## Live Demo
- Frontend: https://gaurikshabank.vercel.app
- Backend API: https://banking-backend-o0oc.onrender.com
- Fraud Detection API: https://fraud-api-ufrg.onrender.com

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS |
| Backend | Java, Spring Boot, Spring Data JPA |
| Database | PostgreSQL (Render) |
| ML Service | Python, Flask, Scikit-learn |
| Deployment | Vercel, Render |

## Features
- Secure account creation with PIN-based authentication
- Fund transfers between accounts with real-time balance update
- Deposit and withdrawal functionality
- AI-powered fraud detection on every transaction
  (Random Forest model trained on Kaggle Credit Card Fraud dataset)
- Automatic block/flag/approve logic based on fraud probability
- Transaction history with filters
- Responsive design — desktop and mobile

## Architecture
React Frontend
↓
Spring Boot Backend ──→ PostgreSQL Database
↓
Flask ML Service (Fraud Detection API)
## Project Structure
gauriksha-bank/
├── frontend/      # React + Vite
├── backend/       # Spring Boot
└── ml-service/    # Flask + Random Forest model
## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /accounts | Create account |
| POST | /accounts/login | Login |
| GET | /accounts/{id} | Get account |
| POST | /accounts/{id}/deposit | Deposit |
| POST | /accounts/{id}/withdraw | Withdraw |
| GET | /accounts/{id}/transactions | Transaction history |
| POST | /transactions/transfer | Transfer with fraud check |
| POST | /predict | Fraud prediction (ML API) |

## Setup Instructions

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
Set environment variables:
SPRING_DATASOURCE_URL=your_postgres_url
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
```bash
cd backend
./mvnw spring-boot:run
```

### ML Service
```bash
cd ml-service
pip install -r requirements.txt
python app.py
```

## ML Model Details
- Algorithm: Random Forest Classifier
- Dataset: Kaggle Credit Card Fraud Detection
- Features: Transaction amount, time, behavioral patterns
- Output: Fraud probability score (0-1)
  - > 0.8 → Transaction Blocked
  - > 0.5 → Transaction Flagged
  - < 0.5 → Transaction Approved
# ✨Created with ❤️ and too much caffeine✨
