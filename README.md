# Healthcare API Assessment

This project demonstrates **API integration**, **data processing**, and **risk analysis** using real-world error handling and pagination.

---

## 🚀 Overview

The DemoMed API provides simulated healthcare data (patients, vitals, and diagnoses).  
Tassk was to:
1. Integrate the REST API securely using an API key.
2. Handle rate limits, intermittent 5xx errors, and inconsistent data.
3. Process all patient data and calculate **Total Risk Score** using:
   - **Blood Pressure Risk**
   - **Temperature Risk**
   - **Age Risk**
4. Generate **alert lists** for:
   - High-risk patients (Total Risk ≥ 4)
   - Fever patients (Temperature ≥ 99.6°F)
   - Data quality issues (missing or invalid data)
5. Submit results via POST to `/api/submit-assessment`.

---

## 🧩 Tech Stack

- **Node.js (ES Modules)**
- **Axios** – for HTTP requests  
- **p-retry** – for automatic retry logic  
- **dotenv** – to securely manage API keys  
- **JavaScript (ES6+)**

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/healthcare-api-assessment.git
cd healthcare-api-assessment

npm install

.env file: X_API_KEY=ak_XXXXXXXXXXXXXXXXXXXXXXXX

Run tests or scripts:

Test connectivity	- node src/smoke.js
Fetch all patients - node src/fetchPatients.js
Generate alert lists	- node src/processPatients.js
Submit assessment	- node src/submitAssessment.js

## Risk Scoring Logic

Blood Pressure:

Category	Criteria	Score
Normal	Systolic < 120 and Diastolic < 80	0
Elevated	Systolic 120–129 and Diastolic < 80	1
Stage 1	Systolic 130–139 or Diastolic 80–89	2
Stage 2	Systolic ≥ 140 or Diastolic ≥ 90	3

Temperature:

Category	Criteria	Score
Normal	≤ 99.5°F	0
Low Fever	99.6–100.9°F	1
High Fever	≥ 101.0°F	2

Age:

Category	Criteria	Score
Under 40	< 40 years	0
Mid-age	40–65 years	1
Senior	> 65 years	2

Total Risk = BP + Temperature + Age


