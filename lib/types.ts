export interface CompData {
  role: string;
  level: string;
  location: string;
  stage: string;
  p25: number;
  p50: number;
  p75: number;
}

export interface OfferCalculation {
  baseSalary: number;
  equity: number;
  equityValue: number;
  bonus: number;
  totalComp: number;
}
