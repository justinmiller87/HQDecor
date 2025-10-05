// --- Scoring Helper Functions ---

// Calculates the variety bonus based on the balance of uncapped heart values.
export function calculateVarietyBonus(green: number, blue: number, red: number): number {
  const hearts = [green, blue, red];
  const sum = hearts.reduce((a, b) => a + b, 0);
  if (sum === 0) return 0;

  const maxHeart = Math.max(...hearts);
  const minHeart = Math.min(...hearts);

  // The bonus is 1 minus the ratio of the spread to the total, rewarding tighter groupings.
  const bonus = 1 - ((maxHeart - minHeart) / sum);
  return bonus;
}

// Type definition for heart caps
type Caps = {
  green: number;
  blue: number;
  red: number;
};

// Type definition for score details
type ScoreDetails = {
  totalScore: number;
  baseScore: number;
  varietyBonus: number;
};

// Calculates the total score for a town, including the variety bonus.
export function calculateTotalScore(
  green: number,
  blue: number,
  red: number,
  caps: Caps = { green: 1000, blue: 1000, red: 1000 }
): ScoreDetails {
  // Base score is capped at the values provided in caps.
  const baseScore = Math.min(green, caps.green) + Math.min(blue, caps.blue) + Math.min(red, caps.red);
  const varietyBonus = calculateVarietyBonus(green, blue, red);
  const totalScore = baseScore + (baseScore * varietyBonus);
  return { totalScore, baseScore, varietyBonus };
}