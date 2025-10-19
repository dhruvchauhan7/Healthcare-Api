import { fetchAllPatients } from "./fetchPatients.js";
import { calculateTotalRisk } from "./riskScoring.js";

function hasDataQualityIssues(patient) {
  const bpValid = typeof patient.blood_pressure === "string" && /^\d+\/\d+$/.test(patient.blood_pressure);
  const tempValid = !isNaN(parseFloat(patient.temperature));
  const ageValid = !isNaN(parseInt(patient.age, 10));

  return !(bpValid && tempValid && ageValid);
}

export async function generateAlertLists() {
  const patients = await fetchAllPatients();

  const highRisk = [];
  const fever = [];
  const dataIssues = [];

  for (const p of patients) {
    if (hasDataQualityIssues(p)) {
      dataIssues.push(p.patient_id);
      continue; 
    }

    const risk = calculateTotalRisk(p);

    if (risk.total >= 4) highRisk.push(p.patient_id);
    if (parseFloat(p.temperature) >= 99.6) fever.push(p.patient_id);
  }

  console.log("High Risk Patients:", highRisk);
  console.log("Fever Patients:", fever);
  console.log("Data Quality Issues:", dataIssues);

  return {
    high_risk_patients: highRisk,
    fever_patients: fever,
    data_quality_issues: dataIssues,
  };
}

if (process.argv[1].includes("processPatients.js")) {
  generateAlertLists().then(() => console.log("Processing complete."));
}
