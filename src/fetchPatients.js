import axios from "axios";
import dotenv from "dotenv";
import pRetry from "p-retry";

dotenv.config();

const BASE_URL = "https://assessment.ksensetech.com/api";
const API_KEY = process.env.X_API_KEY;

/**
 * Fetch a single page (with retry logic)
 */
async function fetchPage(page = 1, limit = 5) {
  return pRetry(
    async () => {
      const res = await axios.get(`${BASE_URL}/patients?page=${page}&limit=${limit}`, {
        headers: { "x-api-key": API_KEY },
        timeout: 10000,
      });
      return res.data;
    },
    {
      retries: 5,
      onFailedAttempt: (err) => {
        console.warn(`Attempt ${err.attemptNumber} failed (${err.retriesLeft} retries left)`);
      },
    }
  );
}

/**
 * Fetch all pages with pagination (skips invalid pages safely)
 */
export async function fetchAllPatients() {
  const allPatients = [];
  let page = 1;
  let hasNext = true;

  while (hasNext) {
    console.log(`Fetching page ${page}...`);
    try {
      const data = await fetchPage(page);

      if (data && Array.isArray(data.data)) {
        allPatients.push(...data.data);
      } else {
        console.warn(`Skipping page ${page} – invalid or missing data`);
      }

      hasNext = data?.pagination?.hasNext ?? false;
      page++;
    } catch (error) {
      console.error(`Failed to fetch page ${page} after retries. Skipping...`);
      console.error(`Error: ${error.message}`);
      page++;
      hasNext = true; // continue until roughly 10 pages
    }
  }

  console.log(`Retrieved ${allPatients.length} valid patient records`);
  return allPatients;
}

/**
 * When run directly, retries full fetch up to 5 times until valid data appears.
 */
if (process.argv[1].includes("fetchPatients.js")) {
  (async () => {
    let patients = [];
    let attempts = 0;
    while (patients.length === 0 && attempts < 5) {
      console.log(`No valid patients yet — retrying full fetch (attempt ${attempts + 1})`);
      patients = await fetchAllPatients();
      attempts++;
    }
    console.log(`Done fetching with ${patients.length} valid patients.`);
  })();
}
