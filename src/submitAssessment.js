import axios from "axios";
import dotenv from "dotenv";
import { generateAlertLists } from "./processPatients.js";

dotenv.config();

const BASE_URL = "https://assessment.ksensetech.com/api";
const API_KEY = process.env.X_API_KEY;

async function submitAssessment() {
  try {
    // Step 1: generate alert data
    const results = await generateAlertLists();

    console.log("Submitting the following data:");
    console.log(JSON.stringify(results, null, 2));

    // Step 2: POST to API
    const response = await axios.post(`${BASE_URL}/submit-assessment`, results, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      timeout: 15000,
    });

    // Step 3: log the server response
    console.log("Submission Response:");
    console.log(JSON.stringify(response.data, null, 2));

  } catch (error) {
    if (error.response) {
      console.error("Submission failed:", error.response.status, error.response.data);
    } else {
      console.error("Network or unexpected error:", error.message);
    }
  }
}

// Run directly
if (process.argv[1].includes("submitAssessment.js")) {
  submitAssessment();
}
