// Calculează diferența minimă circulară între două unghiuri
function calculateDifference(current, target) {
  let difference = Math.abs(current - target);
  if (difference > 180) {
    difference = 360 - difference;
  }
  return difference;
}

// Normalizează diferența într-un scor (0-100), ținând cont de diferența maximă permisă
function scoreDifference(difference, maxAllowedDifference) {
  if (maxAllowedDifference === 0) {
    // current - penalizare
    return difference === 0 ? 100 : 0;
  }
  return Math.max(0, 100 - (difference / maxAllowedDifference) * 100);
}

// Calculează scorul posturii pentru un stadiu, pe baza unghiurilor curente, target și anterioare, ignorând elementele mascate
function calculateStageScore(
  currentAngles,
  targetAngles,
  previousAngles,
  mask,
  currentTrends
) {
  let scores = [];
  let count = 0; // Numărul de elemente nemascate
  // Verificăm dacă toate valorile din currentTrends sunt 0 (adică poziție statică)
  let isStatic = currentTrends.every((trend) => trend === 0);

  // Parcurgem fiecare unghi curent din array
  currentAngles.forEach((current, index) => {
    const target = targetAngles[index];
    const previous = previousAngles[index];
    const masked = mask[index];
    const trend = currentTrends[index];

    // Dacă elementul nu este mascat și fie avem mișcare (trend !== 0 când nu toate sunt statice),
    // fie poziția este statică, calculăm scorul pentru acel element.
    if (!masked && ((!isStatic && trend !== 0) || isStatic)) {
      // Calculăm diferența între unghiul curent și target
      let differenceFromTarget = calculateDifference(current, target);
      let maxAllowedDifference;

      if (trend === 0) {
        // Dacă nu există trend, folosim valoarea curentă ca diferență maximă permisă
        maxAllowedDifference = target;
      } else {
        // În caz contrar, diferența maximă permisă se bazează pe diferența între target și previous
        maxAllowedDifference = calculateDifference(target, previous);
      }

      let movementScore = scoreDifference(
        differenceFromTarget,
        maxAllowedDifference
      );

      scores.push(movementScore);
      count++;
    }
  });

  // Calculăm și returnăm media scorurilor (evitând împărțirea la 0)
  return scores.length > 0
    ? scores.reduce((acc, score) => acc + score, 0) / count
    : 0;
}
function parseStringArray(stagesStr) {
  return stagesStr.split(";").map((stage) => {
    return stage.split(",").map((value) => parseFloat(value.trim()));
  });
}
function flattenAnglesArray(anglesArray) {
  return anglesArray.map((angleMap) => {
    const values = Array.from(angleMap.values());
    return values.length ? values[0] : 0;
  });
}

export {
  calculateDifference,
  scoreDifference,
  calculateStageScore,
  parseStringArray,
  flattenAnglesArray,
};
