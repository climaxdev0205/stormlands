export function isPercentage(value: string | number){
  if (value == "") return true;
  const n = typeof value === "string" ? parseFloat(value) : value;
  if(n>=0 && n<=100) return true
  else return false
}