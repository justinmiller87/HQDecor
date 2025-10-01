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

    decorationsWithQuantities.sort((a, b) => (b.green + b.blue + b.red) - (a.green + a.blue + a.red));

    decorationsWithQuantities.forEach((decoration) => {
      if (isEvergarden && (decoration.name === "Eiffel Tower" || decoration.category !== "Valhalla")) {
        return;
      }

      while (
        decoration.quantity > 0 &&
        townResult.green + decoration.green <= 1000 &&
        townResult.blue + decoration.blue <= 1000 &&
        townResult.red + decoration.red <= 1000
      ) {
        townResult.green += decoration.green;
        townResult.blue += decoration.blue;
        townResult.red += decoration.red;

        const existingDeco = townResult.decorations.find(d => d.name === decoration.name);
        if (existingDeco) {
          existingDeco.quantity++;
        } else {
          townResult.decorations.push({ name: decoration.name, quantity: 1 });
        }
        decoration.quantity--;
      }
    });
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
        d.category === 'Valhalla' && d.name !== 'Eiffel Tower'
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

  return results;
}