type metalPrice = {};
type taxRate = {};
type mineCapacity = {};
type workingDaysPerYear = {};
type MineReserves = {};
type OreGrade = {};
type MiningDilution = {};
type capitalCost = {};
type capex = {};
type operationCost = {};
type workingCapital = {};
type exchangeRate = {};
type royaltyRate = {};
type discountRate = {};
type mineLife = {};
type revenue = {};
type plantRecovery = {};
type Inputs = {};

type Projecta = {
  project_info: {
    projectName: string;
    location: string;
    date: string;
  };
  mine: {
    resources: {
      ores: [
        {
          ore_grade: string;
          value: number;
          units: number;
        },
        {
          ore_grade: string;
          value: number;
          units: number;
        }
      ];
      mine_resources: {
        value: number;
        unit_of_measure: number;
      };
      specific_gravity: {
        value: number;
        unit_of_measure: string;
      };
    };
    mineralClassification: {
      mineral_resources: string;
      reserves: string;
    };
    minining_milling: {
      days_year: number;
      daily_production: number;
      ramp_up: boolean;
      time_period: {
        year1: number;
        year2: number;
        year3: number;
      };
      mine_dilution: number;
      mine_recovery: number;
      mili_recovery: number;
    };
  };
  production: {};
  revenue: {};
  expenditure: {};
  financial: {};
};

