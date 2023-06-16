import { Console } from "console";
import { Version, Step, SubStep, FormField } from "../../../API";

const findValue = (version: Version, key: string): string => {
    if (version.steps?.items && Array.isArray(version.steps.items)) {
        for (let step of version.steps?.items as Step[]) {
            if (!step || !step.subSteps || !step.subSteps.items) {
                continue;
            }
            for (let subStep of step.subSteps.items as SubStep[]) {
                if (!subStep || !subStep.formFields || !subStep.formFields.items) {
                    continue;
                }
                for (let formField of subStep.formFields.items as FormField[]) {
                    if (formField && formField.key === key) {
                        return formField.value;
                    }
                }
            }
        }
    }
    return "0";
};

export const calculateValues = (version: Version, discountRateFactor: number, variable: string = '', percentChange: number = 100) => {

    const percentChangeDecimal = percentChange / 100;
    // Helper function to apply percent change
    const percentageVariables = ['C_ZC_Zn', 'C_PB_Pb', 'MM_MineDilution', 'Tax_RoyaltyRate', 'Tax_TaxRate', 'discountRateFactor']; // next iteration
    const applyPercentChange = (value: number, currentVariable: string): number => {
        if (variable === currentVariable) {
            if (percentageVariables.includes(currentVariable)) {
                return value + percentChange;
            }
            return value * (1 + percentChangeDecimal);
        }
        return value;
    };
    const discountRate = applyPercentChange(discountRateFactor, "discountRateFactor");
    // Construction Period
    const ConstructionPeriod = parseFloat(findValue(version, "Capex_ConstructionPeriod"));
    //Mine Life
    const MM_MineDilution = applyPercentChange(parseFloat(findValue(version, "MM_MineDilution")), "MM_MineDilution") / 100;
    const MR_SpecificGravity = parseFloat(findValue(version, "MR_SpecificGravity"));
    const MR_MineResources = parseFloat(findValue(version, "MR_MineResources"));
    // Daily Ore Production
    const dailyOreProduction = findValue(version, "MM_DailyProduction");
    const daysPerYear = findValue(version, "MM_DaysYear");
    const OreProductionNoDillution = parseFloat(dailyOreProduction) * parseFloat(daysPerYear);
    //Actual Ore Production
    const ActualOreProcessedPerDay = parseFloat(dailyOreProduction) / (1 + MM_MineDilution);
    const AnnualOreProcessed = ActualOreProcessedPerDay * parseFloat(daysPerYear);
    const OreProduction = ActualOreProcessedPerDay && daysPerYear
        ? (applyPercentChange(ActualOreProcessedPerDay * parseFloat(daysPerYear), "MM_DailyProduction")).toString()
        : "0";
    const TotalMineResourcesAndOreReserves = MR_MineResources * MR_SpecificGravity;
    const MineLife = (TotalMineResourcesAndOreReserves / AnnualOreProcessed);
    const MineLifeRounded = Math.round(MineLife);
    // Version Discount Rate
    const DiscountRate = findValue(version, "FR_DiscountRate");
    // Zinc Grade
    const ZincGrade = findValue(version, "MR_ZincResources")?.toString();
    // Zinc Revenue
    const C_ZC_Zn = applyPercentChange(parseFloat(findValue(version, "C_ZC_Zn")), "C_ZC_Zn") / 100;
    const Payables_Z_Deductions = parseFloat(findValue(version, "Payables_Z_Deductions")) / 100;
    const Payables_Z_Payable = parseFloat(findValue(version, "Payables_Z_Payable")) / 100;
    const minPayableZinc = Math.min((C_ZC_Zn - Payables_Z_Deductions), (C_ZC_Zn * Payables_Z_Payable));
    // Combined Metal Price and Specific Metal Prices
    let Price_L_PriceType_Fixed_Select = 0;
    let Price_Z_PriceType_Fixed_Select = 0;
    if (variable === "Combined_Metal_Price") {
        // Combined Metal Price (Zinc + Lead) -- add any other metals here
        Price_L_PriceType_Fixed_Select = applyPercentChange(parseFloat(findValue(version, "Price_L_PriceType_Fixed_Select")), "Combined_Metal_Price");
        Price_Z_PriceType_Fixed_Select = applyPercentChange(parseFloat(findValue(version, "Price_Z_PriceType_Fixed_Select")), "Combined_Metal_Price");
    } else {
        // Specific Metal Prices
        Price_L_PriceType_Fixed_Select = applyPercentChange(parseFloat(findValue(version, "Price_L_PriceType_Fixed_Select")), "Price_L_PriceType_Fixed_Select");
        Price_Z_PriceType_Fixed_Select = applyPercentChange(parseFloat(findValue(version, "Price_Z_PriceType_Fixed_Select")), "Price_Z_PriceType_Fixed_Select");
    }

    const TC_Z_TotalTreatmentCharge = applyPercentChange(parseFloat(findValue(version, "TC_Z_TotalTreatmentCharge")), "TC_Z_TotalTreatmentCharge");
    const Logistics_Z_Logistics = applyPercentChange(parseFloat(findValue(version, "Logistics_Z_Logistics")), "Logistics_Z_Logistics");
    const P_PC_ZincAnnualProd = parseFloat(findValue(version, "P_PC_ZincAnnualProd"));
    const ZincRevenue = (((minPayableZinc * Price_Z_PriceType_Fixed_Select) - TC_Z_TotalTreatmentCharge - Logistics_Z_Logistics) * P_PC_ZincAnnualProd).toString();
    // Lead Grade
    const LeadGrade = findValue(version, "MR_LeadResources")?.toString();
    // Lead Revenue
    const C_PB_Pb = applyPercentChange(parseFloat(findValue(version, "C_PB_Pb")), "C_PB_Pb") / 100;
    const Payables_L_Deductions = parseFloat(findValue(version, "Payables_L_Deductions")) / 100;
    const Payables_L_Payable = parseFloat(findValue(version, "Payables_L_Payable")) / 100;
    const minPayableLead = Math.min((C_PB_Pb - Payables_L_Deductions), (C_PB_Pb * Payables_L_Payable));
    const TC_L_TotalTreatmentCharge = applyPercentChange(parseFloat(findValue(version, "TC_L_TotalTreatmentCharge")), "TC_L_TotalTreatmentCharge");
    const Logistics_L_Logistics = applyPercentChange(parseFloat(findValue(version, "Logistics_L_Logistics")), "Logistics_L_Logistics");
    const P_PC_LeadAnnualProd = parseFloat(findValue(version, "P_PC_LeadAnnualProd"));
    const LeadRevenue = (((minPayableLead * Price_L_PriceType_Fixed_Select) - TC_L_TotalTreatmentCharge - Logistics_L_Logistics) * P_PC_LeadAnnualProd).toString();
    // Total Revenues
    const TotalRevenue = (parseFloat(ZincRevenue) + parseFloat(LeadRevenue)).toString();
    // Expenditure/Capex - Capital Cost
    const Capex_Mine_Year1 = parseFloat(findValue(version, "Capex_Mine_Year1"));
    const Capex_Mine_Year2 = parseFloat(findValue(version, "Capex_Mine_Year2"));
    const Capex_OreTreatment_Year1 = parseFloat(findValue(version, "Capex_OreTreatment_Year1"));
    const Capex_OreTreatment_Year2 = parseFloat(findValue(version, "Capex_OreTreatment_Year2"));
    const CapitalCostY1 = (Capex_Mine_Year1 + Capex_OreTreatment_Year1).toString();
    const CapitalCostY2 = (Capex_Mine_Year2 + Capex_OreTreatment_Year2).toString();
    let CapitalCost = [CapitalCostY1, CapitalCostY2];    // Total Capital Cost
    const TotalCapex = applyPercentChange((parseFloat(CapitalCostY1) + parseFloat(CapitalCostY2)), "TotalCapex");
    // Expenditure/Overheads
    const Over_Overheads = findValue(version, "Over_Overheads");
    let ExpendOverheads = 0;
    if (Over_Overheads === "Total Capex") {
        const Over_Overheads_Percentage = parseFloat(findValue(version, "Over_Overheads_Percentage")) / 100;
        ExpendOverheads = Over_Overheads_Percentage * TotalCapex;
    }
    if (Over_Overheads === "Fixed Amount") {
        ExpendOverheads = parseFloat(findValue(version, "Over_Overheads_Amount"));
    }
    // Expenditure/Operating (Production)
    const Oper_Operating = findValue(version, "Oper_Operating");
    let ExpendOpCost = 0;
    if (Oper_Operating === "Total Capex") {
        const Oper_TotalCapex = parseFloat(findValue(version, "Oper_TotalCapex")) / 100;
        ExpendOpCost = Oper_TotalCapex * TotalCapex;
    }
    if (Oper_Operating === "Fixed Amount") {
        ExpendOpCost = parseFloat(findValue(version, "Oper_FixedAmount"));
    }
    if (Oper_Operating === "Production") {
        const Oper_OperatingMining = parseFloat(findValue(version, "Oper_OperatingMining"));
        const Oper_OperatingMilling = parseFloat(findValue(version, "Oper_OperatingMilling"));
        const Oper_OperatingProcessing = parseFloat(findValue(version, "Oper_OperatingProcessing"));

        ExpendOpCost = (Oper_OperatingMining + Oper_OperatingMilling + Oper_OperatingProcessing);
    }
    // Expenditure/Environmental/Production
    let ExpendEnvCost = 0;
    const E_Production = findValue(version, "E_Production");
    console.log("ExpendOpCost", ExpendOpCost);
    if (E_Production === "Total Operating Costs") {
        const E_ProductionValue = parseFloat(findValue(version, "E_ProductionValue")) / 100;
        ExpendEnvCost = E_ProductionValue * ExpendOpCost;
    }
    if (E_Production === "Total Capex") {
        const E_Production_Capex = parseFloat(findValue(version, "E_Production_Capex")) / 100;
        ExpendEnvCost = E_Production_Capex * TotalCapex;
    }
    if (E_Production === "Fixed Amount") {
        ExpendEnvCost = parseFloat(findValue(version, "E_Production_Fixed"));
    }
    // Expenditure/Environmental/Closure
    let ExpendEnvCostClosure = 0;
    const E_Closure_Lump = findValue(version, "E_Closure_Lump");
    console.log("E_Closure_Lump", E_Closure_Lump);
    const E_Closure_Sink = findValue(version, "E_Closure_Sink"); // Next Iteration
    const E_Closure_Annual = findValue(version, "E_Closure_Annual");
    console.log("E_Closure_Annual", E_Closure_Annual);
    // Expenditure/Environmental/Closure / Lump Sum
    if (E_Closure_Lump) {
        if (E_Closure_Lump === "Total Operating Costs") {
            const E_Closure_Lump_TOC = parseFloat(findValue(version, "E_Closure_Lump_TOC")) / 100;
            console.log("E_Closure_Lump_TOC", E_Closure_Lump_TOC);
            ExpendEnvCostClosure = E_Closure_Lump_TOC * ExpendOpCost;
            console.log("ExpendEnvCostClosure", ExpendEnvCostClosure);
        }
        if (E_Closure_Lump === "Total Capex") {
            const E_Closure_Lump_Capex = parseFloat(findValue(version, "E_Closure_Lump_Capex")) / 100;
            ExpendEnvCostClosure = E_Closure_Lump_Capex * TotalCapex;
        }
        if (E_Closure_Lump === "Fixed Amount") {
            ExpendEnvCostClosure = parseFloat(findValue(version, "E_Closure_Lump_Fixed"));
        }
    }
    // Expenditure/Environmental/Closure / Annual Cost
    if (E_Closure_Annual) {
        if (E_Closure_Annual === "Total Operating Costs") {
            const E_Closure_AnnualValue = parseFloat(findValue(version, "E_Closure_AnnualValue")) / 100;
            ExpendEnvCostClosure = E_Closure_AnnualValue * ExpendOpCost;
        }
        if (E_Closure_Annual === "Total Capex") {
            const E_Closure_Annual_Capex = parseFloat(findValue(version, "E_Closure_Annual_Capex")) / 100;
            ExpendEnvCostClosure = E_Closure_Annual_Capex * TotalCapex;
        }
        if (E_Closure_Annual === "Fixed Amount") {
            ExpendEnvCostClosure = parseFloat(findValue(version, "E_Closure_Annual_Fixed"));
        }
    }

    const adjustedExpendOpCost = applyPercentChange(ExpendOpCost, "OperatingCost");// Production Cost
    let finalExpendOpCost = adjustedExpendOpCost;
    if (Oper_Operating === "Production") {
        finalExpendOpCost = adjustedExpendOpCost * OreProductionNoDillution;
    }

    const OperatingCost = (ExpendOverheads + finalExpendOpCost + ExpendEnvCost).toString();
    // This is the Operating Cost times the Daily Ore Production (Not the Actual Daily Ore Production)
    // const OperatingCost = (OreProductionNoDillution * TotalOperatingCost).toString();
    // Operating Margin
    const OperatingMargin = (parseFloat(TotalRevenue) - parseFloat(OperatingCost)).toString();
    // Working Capital
    let WorkingCapCost = 0;
    let WorkingCapital = '0';
    const WC_WorkingCapital = findValue(version, "WC_WorkingCapital");
    if (WC_WorkingCapital === "Total Capex") {
        const WC_Capex = parseFloat(findValue(version, "WC_Capex")) / 100;
        WorkingCapCost = (TotalCapex * WC_Capex);
        WorkingCapital = WorkingCapCost.toString();
    }
    if (WC_WorkingCapital === "Total Operating") {
        const WC_TOC = parseFloat(findValue(version, "WC_TOC")) / 100;
        WorkingCapCost = (ExpendOpCost * WC_TOC);
        WorkingCapital = (parseFloat(OperatingCost) * WorkingCapCost).toString();
    }
    if (WC_WorkingCapital === "Fixed Amount") {
        WorkingCapital = parseFloat(findValue(version, "WC_Fixed")).toString();
    }
    // Royalties
    const Tax_RoyaltyRate = applyPercentChange(parseFloat(findValue(version, "Tax_RoyaltyRate")) / 100, "Tax_RoyaltyRate");
    const Royalties = (parseFloat(TotalRevenue) * Tax_RoyaltyRate).toString();
    // Capital Allowances
    const CapitalAllowances = ((parseFloat(CapitalCost[0]) + parseFloat(CapitalCost[1])) / (MR_MineResources / OreProductionNoDillution)).toString();
    // Taxable Income
    const greaterThanZeroCapitalAllowances = parseFloat(CapitalAllowances) > 0 ? parseFloat(CapitalAllowances) : 0;
    const TaxableIncome = (parseFloat(OperatingMargin) - parseFloat(Royalties) - greaterThanZeroCapitalAllowances).toString();
    // Corporate Taxes
    const greaterThanZeroTaxableIncome = parseFloat(TaxableIncome) > 0 ? parseFloat(TaxableIncome) : 0;
    const Tax_TaxRate = applyPercentChange(parseFloat(findValue(version, "Tax_TaxRate")) / 100, "Tax_TaxRate");
    const CorporateTaxes = (greaterThanZeroTaxableIncome * Tax_TaxRate).toString();
    // Ramp Up
    const MM_RampUp = findValue(version, "MM_RampUp");
    const index = (MineLifeRounded + ConstructionPeriod) || 1;
    // Fraction of Mine Life Last Year
    const FractionOfMineLifeLastYear = (MineLife - Math.floor(MineLife));
    
    for (let i = 2; i < index; i++) {
      CapitalCost.push("0");
    }

    const initialValues = {
        OreProduction: Array(index).fill(0),
        ZincGrade: Array(index).fill(0),
        ZincRevenue: Array(index).fill(0),
        LeadGrade: Array(index).fill(0),
        LeadRevenue: Array(index).fill(0),
        TotalRevenue: Array(index).fill(0),
        OperatingCost: Array(index).fill(0),
        OperatingMargin: Array(index).fill(0),
        CapitalCost: Array(index).fill(0),
        WorkingCapital: Array(index).fill(0),
        Royalties: Array(index).fill(0),
        CapitalAllowances: Array(index).fill(0),
        TaxableIncome: Array(index).fill(0),
        CorporateTaxes: Array(index).fill(0),
        Cashflow: Array(index).fill(0),
        CumulativeCashflow: Array(index).fill(0),
        DiscountedCashflow: Array(index).fill(0),
        CumulativeDiscountedCashflow: Array(index).fill(0),
        LifeOfMine: Array(1).fill(0),
        DiscountRate: Array(1).fill(0),
        CombinedMetalPrice: Array(1).fill(0),
        ZincPrice: Array(1).fill(0),
        LeadPrice: Array(1).fill(0),
        ConstructionPeriod: Array(1).fill(0),
        ExpendOverheads: Array(1).fill(0),
        ExpendOpCost: Array(1).fill(0),
        ExpendEnvCost: Array(1).fill(0),
        ExpendEnvCostClosure: Array(1).fill(0),
    };

    for (let year = 0; year < index; year++) {
        // Calculate ramp-up multiplier if ramp-up is enabled and after the construction period
        let rampUpMultiplier = 1;
        if (MM_RampUp === "true" && year >= ConstructionPeriod && year < ConstructionPeriod + 3) {
          rampUpMultiplier = year === ConstructionPeriod ? parseFloat(findValue(version, "MM_Year1")) / 100 :
            year === ConstructionPeriod + 1 ? parseFloat(findValue(version, "MM_Year2")) / 100 :
            parseFloat(findValue(version, "MM_Year3")) / 100;
        }
      
        // Construction period logic
        if (year < ConstructionPeriod) {
          initialValues.WorkingCapital[year] = "0";
          initialValues.OreProduction[year] = "0";
          initialValues.ZincGrade[year] = "0";
          initialValues.ZincRevenue[year] = "0";
          initialValues.LeadGrade[year] = "0";
          initialValues.LeadRevenue[year] = "0";
          initialValues.TotalRevenue[year] = "0";
          initialValues.OperatingCost[year] = "0";
          initialValues.OperatingMargin[year] = "0";
          initialValues.Royalties[year] = "0";
          initialValues.CapitalAllowances[year] = "0";
          initialValues.TaxableIncome[year] = "0";
          initialValues.CorporateTaxes[year] = "0";
        } else {
          // After construction period
          initialValues.WorkingCapital[year] = year === ConstructionPeriod ? parseFloat(WorkingCapital).toString() : "0";
          initialValues.OreProduction[year] = (OreProductionNoDillution * rampUpMultiplier).toString();
          initialValues.ZincGrade[year] = parseFloat(ZincGrade).toString();
          initialValues.ZincRevenue[year] = (parseFloat(ZincRevenue) * rampUpMultiplier).toString();
          initialValues.LeadGrade[year] = parseFloat(LeadGrade).toString();
          initialValues.LeadRevenue[year] = (parseFloat(LeadRevenue) * rampUpMultiplier).toString();
          initialValues.TotalRevenue[year] = (parseFloat(TotalRevenue) * rampUpMultiplier).toString();
          initialValues.OperatingCost[year] = (parseFloat(OperatingCost) * rampUpMultiplier).toString();
          initialValues.OperatingMargin[year] = (parseFloat(OperatingMargin) * rampUpMultiplier).toString();
          initialValues.Royalties[year] = (parseFloat(Royalties) * rampUpMultiplier).toString();
          initialValues.CapitalAllowances[year] = (parseFloat(CapitalAllowances) * rampUpMultiplier).toString();
          initialValues.TaxableIncome[year] = (parseFloat(TaxableIncome) * rampUpMultiplier).toString();
          initialValues.CorporateTaxes[year] = (parseFloat(CorporateTaxes) * rampUpMultiplier).toString();
        }
      
        initialValues.CapitalCost[year] = CapitalCost[year];
      
        // Calculate cashflow for each year
        const prevCorporateTaxes = year - 1 < 0 ? 0 : parseFloat(initialValues.CorporateTaxes[year - 1]);
        const cashflow = parseFloat(initialValues.OperatingMargin[year]) -
          parseFloat(initialValues.CapitalCost[year]) -
          parseFloat(initialValues.WorkingCapital[year] || '0') -
          parseFloat(initialValues.Royalties[year]) -
          prevCorporateTaxes;
        initialValues.Cashflow[year] = cashflow.toString();

        // Calculate cumulative cashflow for each year
        const prevCumulativeCashflow = year - 1 < 0 ? 0 : parseFloat(initialValues.CumulativeCashflow[year - 1]);
        const cumulativeCashflow = cashflow + prevCumulativeCashflow;
        initialValues.CumulativeCashflow[year] = cumulativeCashflow.toString();

        // Calculate discounted cashflow for each year
        const discountedCashflow = cashflow / Math.pow(1 + (discountRate / 100), year + 1);
        initialValues.DiscountedCashflow[year] = discountedCashflow.toString();

        // Calculate cumulative discounted cashflow for each year
        const prevCumulativeDiscountedCashflow = year - 1 < 0 ? 0 : parseFloat(initialValues.CumulativeDiscountedCashflow[year - 1]);
        const cumulativeDiscountedCashflow = discountedCashflow + prevCumulativeDiscountedCashflow;
        initialValues.CumulativeDiscountedCashflow[year] = cumulativeDiscountedCashflow.toString();
    }
    // If there is a lump sum expenditure, add it to the last year of capital cost
    if(E_Closure_Lump) {
        console.log("Lump sum expenditure found");
        console.log("Lump sum expenditure: " + ExpendEnvCostClosure);
        console.log("Last year of operating cost: " + initialValues.OperatingCost[index - 1]);
        initialValues.OperatingCost[index - 1] = parseFloat(initialValues.OperatingCost[index - 1]) + ExpendEnvCostClosure;
    }

    // Multiply all the values in the last year by the fraction of mine life last year
// let lastYearIndex = (index);
// let fractionOfYear = FractionOfMineLifeLastYear;

// initialValues.WorkingCapital[lastYearIndex] = parseFloat(initialValues.WorkingCapital[lastYearIndex]) * fractionOfYear;
// initialValues.OreProduction[lastYearIndex] = parseFloat(initialValues.OreProduction[lastYearIndex]) * fractionOfYear;
// initialValues.ZincRevenue[lastYearIndex] = parseFloat(initialValues.ZincRevenue[lastYearIndex]) * fractionOfYear;
// initialValues.LeadRevenue[lastYearIndex] = parseFloat(initialValues.LeadRevenue[lastYearIndex]) * fractionOfYear;
// initialValues.TotalRevenue[lastYearIndex] = parseFloat(initialValues.TotalRevenue[lastYearIndex]) * fractionOfYear;
// initialValues.OperatingCost[lastYearIndex] = parseFloat(initialValues.OperatingCost[lastYearIndex]) * fractionOfYear;
// initialValues.OperatingMargin[lastYearIndex] = parseFloat(initialValues.OperatingMargin[lastYearIndex]) * fractionOfYear;
// initialValues.Royalties[lastYearIndex] = parseFloat(initialValues.Royalties[lastYearIndex]) * fractionOfYear;
// initialValues.CapitalAllowances[lastYearIndex] = parseFloat(initialValues.CapitalAllowances[lastYearIndex]) * fractionOfYear;
// initialValues.TaxableIncome[lastYearIndex] = parseFloat(initialValues.TaxableIncome[lastYearIndex]) * fractionOfYear;
// initialValues.CorporateTaxes[lastYearIndex] = parseFloat(initialValues.CorporateTaxes[lastYearIndex]) * fractionOfYear;

// // Compute CapitalCost
// initialValues.CapitalCost[lastYearIndex] = parseFloat(initialValues.CapitalCost[lastYearIndex]) * fractionOfYear;

// // Calculate cashflow for the last year
// initialValues.Cashflow[lastYearIndex] = parseFloat(initialValues.Cashflow[lastYearIndex - 1]) * fractionOfYear;
// console.log("initialValues.Cashflow[lastYearIndex] = " + initialValues.Cashflow[lastYearIndex]);

// // Calculate cumulative cashflow for the last year
// initialValues.CumulativeCashflow[lastYearIndex] = parseFloat(initialValues.CumulativeCashflow[lastYearIndex - 1]) * fractionOfYear;

// // Calculate discounted cashflow for the last year
// initialValues.DiscountedCashflow[lastYearIndex] = parseFloat(initialValues.DiscountedCashflow[lastYearIndex - 1]) * fractionOfYear;

// // Calculate cumulative discounted cashflow for the last year
// initialValues.CumulativeDiscountedCashflow[lastYearIndex] = parseFloat(initialValues.CumulativeDiscountedCashflow[lastYearIndex - 1]) * fractionOfYear;


    initialValues.ZincPrice[0] = (Price_Z_PriceType_Fixed_Select).toString();
    initialValues.LeadPrice[0] = (Price_L_PriceType_Fixed_Select).toString();
    initialValues.ExpendOverheads[0] = (ExpendOverheads).toString();
    initialValues.ExpendOpCost[0] = (ExpendOpCost).toString();
    initialValues.ExpendEnvCost[0] = (ExpendEnvCost).toString();
    initialValues.ExpendEnvCostClosure[0] = (ExpendEnvCostClosure).toString();


    initialValues.LifeOfMine[0] = (MineLife).toString();
    initialValues.ConstructionPeriod[0] = (ConstructionPeriod).toString();
    initialValues.DiscountRate[0] = (DiscountRate).toString();

    return initialValues;
};