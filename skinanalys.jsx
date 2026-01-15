import { skinDataset, type Undertone, type SkinDataEntry } from '@shared/schema';

// C4.5 Decision Tree
export function classifyUndertone(avgR: number, avgG: number, avgB: number): Undertone {
  if (avgR > 180) return 'Warm';
  else if (avgB > 170) return 'Cool';
  else return 'Neutral';
}

// Find closest RGB match
export function findClosestMatch(avgR, avgG, avgB, undertone): SkinDataEntry {
  const sameUndertone = skinDataset.filter(entry => entry.undertone === undertone);
  let closestMatch = sameUndertone[0];
  let minDistance = Number.MAX_VALUE;
  
  for (const entry of sameUndertone) {
    const distance = Math.sqrt(
      Math.pow(entry.r - avgR, 2) +
      Math.pow(entry.g - avgG, 2) +
      Math.pow(entry.b - avgB, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = entry;
    }
  }
  return closestMatch;
}

// Get 3 hijab recommendations
export function getRecommendations(match): HijabRecommendation[] {
  return [
    { id: `${match.no}-dark`, colorName: match.gelap, category: 'Dark', hexColor: match.gelapHex },
    { id: `${match.no}-pastel`, colorName: match.pastel, category: 'Pastel', hexColor: match.pastelHex },
    { id: `${match.no}-brown`, colorName: match.percoklatan, category: 'Brown Tones', hexColor: match.percoklatanHex }
  ];
}
