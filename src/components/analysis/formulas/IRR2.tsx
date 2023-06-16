export function calculateIRR(cashFlows: number[]): number | null {
  let guess = 0;  // Initial guess for IRR
  const maxIterations = 1000; // Maximum number of iterations
  const acceptedError = 0.00001; // Accepted error

  for (let i = 0; i < maxIterations; i++) {
      let totalPV = 0;
      let totalDerivativePV = 0;
      
      for (let j = 0; j < cashFlows.length; j++) {
          let pv = cashFlows[j] / Math.pow((1 + guess), j);
          totalPV += pv;

          if (j > 0) { // The derivative of the first cash flow is 0
              let derivativePV = -j * cashFlows[j] / Math.pow((1 + guess), j + 1);
              totalDerivativePV += derivativePV;
          }
      }

      if (Math.abs(totalPV) < acceptedError) {
          return guess;
      }

      // Newton-Raphson method: guess = guess - f(guess) / f'(guess)
      let nextGuess = guess - totalPV / totalDerivativePV;

      // If the guess doesn't change much, return it
      if (Math.abs(nextGuess - guess) < acceptedError) {
          return guess;
      }

      guess = nextGuess;
  }

  console.error("IRR calculation did not converge");
  return null; // If we haven't converged within maxIterations, return null
}