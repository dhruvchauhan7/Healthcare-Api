import { calculateTotalRisk } from "./riskScoring.js";

const examplePatient = {
  patient_id: "DEMO001",
  blood_pressure: "135/85",
  temperature: 100.4,
  age: 67,
};

console.log(calculateTotalRisk(examplePatient));
