export function calculateNPV(discountRate: number, ...cashFlows: number[]): number {
    let npv = 0;
    // console.log("Input values: discountRate =", discountRate, "cashFlows =", cashFlows);

    for (let t = 0; t < cashFlows.length; t++) {
      npv += cashFlows[t] / Math.pow(1 + (discountRate/100), t + 1);
    }
  
    return npv;
  }
  