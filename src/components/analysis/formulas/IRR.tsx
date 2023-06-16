export function calculateIRR(cashFlows: number[]): number {
    const maxIterations = 1000;
    const tolerance = 1e-6;
    let guess = 0;
  
    for (let i = 0; i < maxIterations; i++) {
      const npv = cashFlows.reduce((acc, cashFlow, t) => acc + cashFlow / Math.pow(1 + guess, t), 0);
      const npvDerivative = cashFlows.reduce((acc, cashFlow, t) => acc - (t * cashFlow) / Math.pow(1 + guess, t + 1), 0);
  
      const newGuess = guess - npv / npvDerivative;
      const guessDifference = Math.abs(newGuess - guess);
  
      if (guessDifference < tolerance) {
        return newGuess;
      }
      guess = newGuess;
    }

    return 0;
  }