

//
// APP VARIABLES
//

enum MineralResources {
  Inferred,
  Indicated,
  Measured,
}

enum MineralReserves {
  Probable,
  Proven,
}

// 1. Mine Resources
type OreGrade = {
  name: String;
  value: Number;
};
type Resource = Number
type SpecificGravity = Number

// 2. Classification
type MineralResources = MineralResources;
type MineralReserves = MineralReserves;

// Mining and Milling
type WorkingDaysPerYear = Number;
type DailyProduction = Number;
type MineDilution = Number;
type MineRecovery = Number;
type MillRecovery = Number;
type RampUp = {
  yearOne: Number;
  yearTwo: Number;
  yearThree: Number;
};


// VARIABLES TO CALCULATE THE LIFE OF MINE
type Resource = Resource; // example 3.4 million MT
type OreMined = DailyProduction; // MT per DAY
type MineLife = {
  reserves: MineralReserves;
  dilution: Number;
  capacity: DailyProduction;
  workingDaysPerYear: WorkingDaysPerYear;
};

