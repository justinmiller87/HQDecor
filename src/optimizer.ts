// Home Quest Decor Helper - Optimization Logic
// Contains functions for distributing decorations across towns using different strategies

import decorationsData from "./decorations.json";
import { calculateTotalScore } from "./scoring";

// Type definitions for decorations and optimization results
type Decoration = {
  name: string;
  category: string;
  green: number;
  blue: number;
  red: number;
};

type TownResult = {
  green: number;
  blue: number;
  red: number;
  decorations: { name: string; quantity: number }[];
};

// --- Optimization Functions ---

// Maximum Optimization: Fills up one town at a time, prioritizing Evergarden.
export function optimizeDecorations(
  towns: string[],
  decorationQuantities: Record<string, number>
) {
  const results: Record<string, TownResult> = {};

  towns.forEach((town) => {
    results[town] = { green: 0, blue: 0, red: 0, decorations: [] };
  });

  const decorationsWithQuantities = decorationsData.map(decoration => ({
    ...decoration,
    quantity: decorationQuantities[decoration.name] || 0,
  }));

  const processOrder = [...towns];
  if (processOrder.includes("evergarden")) {
    const index = processOrder.indexOf("evergarden");
    processOrder.splice(index, 1);
    processOrder.unshift("evergarden");
  }

  processOrder.forEach((town) => {
    const townResult = results[town];
    const isEvergarden = town.toLowerCase() === "evergarden";

    // Loop until the town's hearts are all at or above 1000
    while (townResult.green < 1000 || townResult.blue < 1000 || townResult.red < 1000) {
      let bestDecoration: (Decoration & { quantity: number }) | null = null;
      let maxScore = -1;

      // Find the best decoration to add in this step
      for (const decoration of decorationsWithQuantities) {
        if (decoration.quantity <= 0) continue;
        if (isEvergarden && decoration.category !== "Valhalla") continue;

        // Calculate a "need" for each color, giving more weight to lower values.
        const greenNeed = Math.max(0, 1000 - townResult.green);
        const blueNeed = Math.max(0, 1000 - townResult.blue);
        const redNeed = Math.max(0, 1000 - townResult.red);

        // Score is the weighted sum of the decoration's contribution to the needed hearts.
        const score = (decoration.green * greenNeed) + (decoration.blue * blueNeed) + (decoration.red * redNeed);

        // We want the decoration that gives the most points to the needed colors
        if (score > maxScore) {
          maxScore = score;
          bestDecoration = decoration;
        }
      }

      // If no suitable decoration is found (e.g., no more decorations, or no decoration helps), break the loop
      if (!bestDecoration || maxScore === 0) {
        break;
      }

      // Add the best decoration found
      townResult.green += bestDecoration.green;
      townResult.blue += bestDecoration.blue;
      townResult.red += bestDecoration.red;

      const existingDeco = townResult.decorations.find(d => d.name === bestDecoration!.name);
      if (existingDeco) {
        existingDeco.quantity++;
      } else {
        townResult.decorations.push({ name: bestDecoration.name, quantity: 1 });
      }
      bestDecoration.quantity--;
    }
  });

  // Post-process to include all decorations, with zero quantity if not present
  towns.forEach((town) => {
    const townResult = results[town];
    const isEvergarden = town.toLowerCase() === "evergarden";

    const allDecorations = decorationsData
      .filter(decoration => {
        if (isEvergarden) {
          return decoration.category === 'Valhalla';
        }
        return true; // All decorations for other towns
      })
      .map(decoration => {
        const existingDeco = townResult.decorations.find(d => d.name === decoration.name);
        return {
          name: decoration.name,
          quantity: existingDeco ? existingDeco.quantity : 0,
        };
      });

    townResult.decorations = allDecorations;
  });

  return results;
}

// Balanced Optimization: A greedy algorithm that maximizes the Total Score at each step.
export function optimizeDecorationsBalanced(
  towns: string[],
  decorationQuantities: Record<string, number>
): Record<string, any> {
  const results: Record<string, any> = {};
  const mutableQuantities = { ...decorationQuantities };

  towns.forEach((town) => {
    results[town] = { decorations: [], green: 0, blue: 0, red: 0 };
  });

  // Step 1: Prioritize and process Evergarden if it is selected
  if (towns.includes("evergarden")) {
    const evergardenResult = results["evergarden"];
    const evergardenAllowedDecorations = decorationsData.filter(d =>
        d.category === 'Valhalla'
    );

    while (true) {
        let bestPlacement: { decoration: Decoration; scoreIncrease: number } | null = null;
        const currentScore = calculateTotalScore(evergardenResult.green, evergardenResult.blue, evergardenResult.red);

        for (const decoration of evergardenAllowedDecorations) {
            if (mutableQuantities[decoration.name] > 0) {
                const newGreen = evergardenResult.green + decoration.green;
                const newBlue = evergardenResult.blue + decoration.blue;
                const newRed = evergardenResult.red + decoration.red;
                const newScore = calculateTotalScore(newGreen, newBlue, newRed);
                const scoreIncrease = newScore - currentScore;

                if (!bestPlacement || scoreIncrease > bestPlacement.scoreIncrease) {
                    bestPlacement = { decoration, scoreIncrease };
                }
            }
        }

        if (bestPlacement && bestPlacement.scoreIncrease > 0) {
            const { decoration } = bestPlacement;
            evergardenResult.green += decoration.green;
            evergardenResult.blue += decoration.blue;
            evergardenResult.red += decoration.red;

            const existingDeco = evergardenResult.decorations.find((d: any) => d.name === decoration.name);
            if (existingDeco) {
                existingDeco.quantity++;
            } else {
                evergardenResult.decorations.push({ name: decoration.name, quantity: 1 });
            }
            mutableQuantities[decoration.name]--;
        } else {
            break; // No more beneficial placements for Evergarden
        }
    }
  }

  // Step 2: Process the remaining towns with all remaining decorations
  const otherTowns = towns.filter(t => t !== "evergarden");
  if (otherTowns.length > 0) {
    while (true) {
        let bestPlacement: { town: string; decoration: Decoration; scoreIncrease: number } | null = null;

        const availableDecoList = decorationsData.filter(d => mutableQuantities[d.name] > 0);
        if (availableDecoList.length === 0) break;

        for (const town of otherTowns) {
            const townResult = results[town];
            const currentScore = calculateTotalScore(townResult.green, townResult.blue, townResult.red);

            for (const decoration of availableDecoList) {
                const newGreen = townResult.green + decoration.green;
                const newBlue = townResult.blue + decoration.blue;
                const newRed = townResult.red + decoration.red;
                const newScore = calculateTotalScore(newGreen, newBlue, newRed);
                const scoreIncrease = newScore - currentScore;

                if (!bestPlacement || scoreIncrease > bestPlacement.scoreIncrease) {
                    bestPlacement = { town, decoration, scoreIncrease };
                }
            }
        }

        if (bestPlacement && bestPlacement.scoreIncrease > 0) {
            const { town, decoration } = bestPlacement;
            const townResult = results[town];
            townResult.green += decoration.green;
            townResult.blue += decoration.blue;
            townResult.red += decoration.red;

            const existingDeco = townResult.decorations.find((d: any) => d.name === decoration.name);
            if (existingDeco) {
                existingDeco.quantity++;
            } else {
                townResult.decorations.push({ name: decoration.name, quantity: 1 });
            }
            mutableQuantities[decoration.name]--;
        } else {
            break; // No more beneficial placements found for any other town
        }
    }
  }

  // Post-process to include all decorations, with zero quantity if not present
  towns.forEach((town) => {
    const townResult = results[town];
    const isEvergarden = town.toLowerCase() === "evergarden";

    const allDecorations = decorationsData
      .filter(decoration => {
        if (isEvergarden) {
          return decoration.category === 'Valhalla';
        }
        return true; // All decorations for other towns
      })
      .map(decoration => {
        const existingDeco = townResult.decorations.find((d: any) => d.name === decoration.name);
        return {
          name: decoration.name,
          quantity: existingDeco ? existingDeco.quantity : 0,
        };
      });

    townResult.decorations = allDecorations;
  });

  return results;
}
