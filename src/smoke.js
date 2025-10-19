import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://assessment.ksensetech.com/api";
const API_KEY = process.env.X_API_KEY;

async function testConnection() {
  try {
    const response = await axios.get(`${BASE_URL}/patients?page=1&limit=2`, {
      headers: { "x-api-key": API_KEY },
    });
    console.log("Connection successful!");
    console.log("Sample data:", response.data.data.slice(0, 1));
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Connection failed:", error.message);
    }
  }
}

testConnection();
