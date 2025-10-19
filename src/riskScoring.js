
 function parseBloodPressure(bpString) {
    if (!bpString || typeof bpString !== "string") return null;
    const match = bpString.match(/^(\d+)\s*\/\s*(\d+)$/);
    if (!match) return null;
    const systolic = parseInt(match[1], 10);
    const diastolic = parseInt(match[2], 10);
    return { systolic, diastolic };
  }
  
  function scoreBloodPressure(bpString) {
    const bp = parseBloodPressure(bpString);
    if (!bp) return 0;
  
    const { systolic, diastolic } = bp;
    if (systolic >= 140 || diastolic >= 90) return 3;
    if (systolic >= 130 || diastolic >= 80) return 2;
    if (systolic >= 120 && diastolic < 80) return 1;
    if (systolic < 120 && diastolic < 80) return 0;
    return 0;
  }
  
  function scoreTemperature(temp) {
    const val = parseFloat(temp);
    if (isNaN(val)) return 0;
    if (val >= 101.0) return 2;
    if (val >= 99.6 && val <= 100.9) return 1;
    if (val <= 99.5) return 0;
    return 0;
  }
  
  function scoreAge(age) {
    const val = parseInt(age, 10);
    if (isNaN(val)) return 0;
    if (val > 65) return 2;
    if (val >= 40 && val <= 65) return 1;
    if (val < 40) return 0;
    return 0;
  }
  
  export function calculateTotalRisk(patient) {
    const bpScore = scoreBloodPressure(patient.blood_pressure);
    const tempScore = scoreTemperature(patient.temperature);
    const ageScore = scoreAge(patient.age);
    const total = bpScore + tempScore + ageScore;
  
    return {
      patient_id: patient.patient_id,
      bpScore,
      tempScore,
      ageScore,
      total,
    };
  }
  