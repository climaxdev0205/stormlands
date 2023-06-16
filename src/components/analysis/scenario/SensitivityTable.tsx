import React, { useEffect, useRef, useState } from 'react';
import { Chart, ChartData } from "chart.js/auto";
import { Grid, Button, Typography, Box, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import { BsArrowLeft } from "react-icons/bs";
import { Modal } from '@components/ui';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { calculateNPV } from '../formulas/NPV';
import { calculateIRR } from '../formulas/IRR';
import { calculateValues } from '../formulas/Calculations';
import { Version } from '../../../API';

interface Props {
    discountRate: number;
    version: Version;
    type: string;
    backSensitivity: (data: string) => void;
}

const generateChartData = (percentChangeData: any[]): any[] => {
    const data: any[] = [];

    percentChangeData.forEach((item: any) => {
        data.push({
            label: item.label,
            data: item.data,
            backgroundColor: item.color || `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
        });
    });
    // console.log("data: ", data);
    return data;
};

const SensitivityTable: React.FC<Props> = ({ discountRate, version, type , backSensitivity}) => {

    const [min, setMin] = useState(-50);
    const [max, setMax] = useState(50);
    const [increment, setIncrement] = useState(10);

    const generateNPVPercentChangeDataForVariables = (
        version: Version,
        discountRate: number,
        variables: Array<{ label: string; key: string, color: string }>,
        minPercent: number,
        maxPercent: number,
        increment: number
    ) => {
        const npvData = [];

        for (const variable of variables) {
            const npvPercentChangeData = getNPVPercentChangeData(
                version,
                discountRate,
                variable.key,
                minPercent,
                maxPercent,
                increment
            );
            npvData.push({ label: variable.label, data: npvPercentChangeData, color: variable.color });
        }

        return npvData;
    };

    const getNPVPercentChangeData = (
        version: Version,
        discountRate: number,
        variable: string,
        minPercent: number,
        maxPercent: number,
        increment: number
    ) => {
        const npvPercentChangeData = [];

        // Calculate the base NPV
        const baseFinacialCalculations = calculateValues(version, discountRate, variable, 0);
        const baseCashFlowsAsNumbers = baseFinacialCalculations.Cashflow.map(parseFloat);
        const baseNPV = calculateNPV(discountRate, ...baseCashFlowsAsNumbers);

        for (let percent = minPercent; percent <= maxPercent; percent += increment) {
            const finacialCalculations = calculateValues(version, discountRate, variable, percent);
            const cashFlowsAsNumbers = finacialCalculations.Cashflow.map(parseFloat);
            const npv = calculateNPV(discountRate, ...cashFlowsAsNumbers);
            const npvPercentChange = ((npv - baseNPV) / baseNPV) * 100;
            npvPercentChangeData.push({ x: percent, y: npvPercentChange });
        }

        return npvPercentChangeData;
    };

    const generateIRRPercentChangeDataForVariables = (
        version: Version,
        discountRate: number,
        variables: Array<{ label: string; key: string, color: string }>,
        minPercent: number,
        maxPercent: number,
        increment: number
    ) => {
        const irrData = [];

        for (const variable of variables) {
            const irrPercentChangeData = getIRRPercentChangeData(
                version,
                discountRate,
                variable.key,
                minPercent,
                maxPercent,
                increment
            );
            irrData.push({ label: variable.label, data: irrPercentChangeData, color: variable.color });
        }

        return irrData;

    };

    const getIRRPercentChangeData = (
        version: Version,
        discountRate: number,
        variable: string,
        minPercent: number,
        maxPercent: number,
        increment: number
    ) => {
        const irrPercentChangeData = [];

        // Calculate the base IRR
        const baseFinacialCalculations = calculateValues(version, discountRate, variable, 0);
        const baseDiscountedCashFlowsAsNumbers = baseFinacialCalculations.DiscountedCashflow.map(parseFloat);
        const baseIRRResult = calculateIRR(baseDiscountedCashFlowsAsNumbers);
        const baseIRR = (baseIRRResult ? baseIRRResult * 100 : 0);
        console.log("baseIRR: ", baseIRR);

        for (let percent = minPercent; percent <= maxPercent; percent += increment) {
            const finacialCalculations = calculateValues(version, discountRate, variable, percent);
            const discountedCashFlowsAsNumbers = finacialCalculations.DiscountedCashflow.map(parseFloat);
            const irrResult = calculateIRR(discountedCashFlowsAsNumbers);
            const irr = (irrResult ? irrResult * 100 : 0);
            console.log("irr: ", irr);
            const irrPercentChange = ((irr - baseIRR) / baseIRR) * 100;
            console.log("irrPercentChange: ", irrPercentChange);
            irrPercentChangeData.push({ x: percent, y: irrPercentChange });
        }

        return irrPercentChangeData;

    };

    const chartLabels = [
        { label: 'Combined Metal Price', key: 'Combined_Metal_Price', color: '#FF0000' }, // red
        { label: 'Zinc Price', key: 'Price_Z_PriceType_Fixed_Select', color: '#FF00FF' }, // purple
        { label: 'Lead Price', key: 'Price_L_PriceType_Fixed_Select', color: '#00FFFF' }, // cyan
        { label: 'Operating Cost', key: 'OperatingCost',  color: '#800000' }, // maroon
        { label: 'Royalties', key: 'Tax_RoyaltyRate', color: '#008000' }, // green
        { label: 'Corporation Tax Rate', key: 'Tax_TaxRate', color: '#000080' }, // navy
        { label: 'Discount Rate', key: 'discountRateFactor', color: '#808000' }, // olive
        { label: 'Capex', key: 'TotalCapex', color: '#800080' }, // purple
    ];
    console.log("type: ", type);
    let percentChangeData: any[] = [];
    if (type === 'IRR') {
        percentChangeData = generateIRRPercentChangeDataForVariables(version, discountRate, chartLabels, -100, 100, increment);
        console.log("IRRPercentChangeData: ", percentChangeData);
    } else {
        percentChangeData = generateNPVPercentChangeDataForVariables(version, discountRate, chartLabels, -100, 100, increment);
        console.log("NPVPercentChangeData: ", percentChangeData);
    }
    const [chartCheckedState, setChartCheckedState] = useState<boolean[]>([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]);

    const chartData = generateChartData(percentChangeData);

    const formatData = (data: any[], checkState: boolean[]): ChartData => {
        let mData: any = [];
        data.map((val, i) => { checkState[i] && mData.push(data[i]); })

        let cData = {
            datasets: mData
        };
        return cData;
    };

    const formatOption = () => ({
        scales: {
            x: {
                min: min,
                max: max,
                ticks: {
                    stepSize: increment
                }
            },
            y: {
                suggestedMin: -50,
                suggestedMax: 50,
                ticks: {
                    stepSize: increment
                }
            }
        },
        plugins: {
            legend: {
                onHover: (evt: any, legendItem: any, legend: any) => {
                    const index = legendItem.datasetIndex;
                    const chart = legend.chart;
                    const meta = chart.getDatasetMeta(index);
                    console.log(meta);
                },
            },
        }
    })

    // use a ref to store the chart instance since it mutable
    const chartRef = useRef<Chart | null>(null);
    const chartId = useRef<string | null>(null);

    const handleChange = (e: any) => {
        if (chartRef.current) {
            const sValue = e.target.checked;
            const sLabel = e.target.labels[0].innerText;
            const index = chartLabels.findIndex((item) => item.label === sLabel);

            const updateState = [...chartCheckedState];
            updateState[index] = sValue;
            setChartCheckedState(updateState);

            chartRef.current.data = formatData(chartData, chartCheckedState);
            chartRef.current.update();
        }
    };

    // callback creates the chart on the canvas element
    const canvasCallback = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            if (chartId.current !== null) {
                return;
            }
            chartRef.current = new Chart(ctx, {
                type: 'scatter',
                data: formatData(chartData, chartCheckedState),
                options: formatOption()
            });
            chartId.current = "1";
        }
    };

    // effect to update the chart when props are updated
    useEffect(() => {
        // must verify that the chart exists
        if (chartRef.current) {
            chartRef.current.data = formatData(chartData, chartCheckedState);
            chartRef.current.options = formatOption();
            chartRef.current.update();
        }

    }, [chartData]);

    return (
        <>
            <Grid container sx={{ marginBottom: 2 }}>
                <Grid xs={2} alignItems="center">
                    <Typography
                        sx={{ fontSize: 18, fontWeight: "bold", display: "flex", alignItems: "Center" }}
                        onClick={() => backSensitivity("Scenario")}
                    >
                        <BsArrowLeft />
                        Back
                    </Typography>
                </Grid>
                <Grid xs={6} />
                <Grid xs={2}>
                    <Button sx={{ width: 150 }} disabled={true} variant="outlined">Save as PDF</Button>
                </Grid>
                <Grid xs={2}>
                    <Button sx={{ width: 150 }} disabled={true} variant="outlined">Send as Email</Button>
                </Grid>
            </Grid>
            <Modal title="Sensitivity Analysis" /* add any additional modal props here */>
                <Box
                    sx={{
                        flexGrow: 1,
                        bgcolor: 'background.paper',
                        paddingLeft: 3,
                        paddingRight: 3,
                        paddingTop: 3,
                        height: 'auto',
                        minHeight: 700,
                        width: '100%', // use '100%' for full width
                    }}
                    className="stormShadowNoTop"
                >
                    <Grid container sx={{ marginBottom: 2 }}>
                        <Grid item xs={3} sx={{ borderRight: '2px solid #DDE2E5', minHeight: 700, height: 'auto' }}>
                            <Typography sx={{ fontSize: 13, marginBottom: 2 }}>
                            Revenue
                            </Typography>
                            <FormGroup sx={{ marginLeft: 3 }}>
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Combined Metal Price" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Zinc Price" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Lead Price" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Operating Cost" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Royalties" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Corporation Tax Rate" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Discount Rate" />
                                <FormControlLabel
                                    control={<Checkbox onChange={handleChange} />} label="Capex" />
                            </FormGroup>
                        </Grid>
                        <Grid item xs={2} sx={{ marginLeft: 4 }}>
                            <Typography variant="h6">Set Range</Typography>
                            <FormControl>
                                <Typography sx={{ fontSize: 15, marginBottom: 1, marginTop: 2 }}>Minimum(%)</Typography>
                                <Select sx={{ minWidth: 150 }} value={min} onChange={e => setMin(Number(e.target.value))}>
                                    {
                                        Array.from({ length: 10 }, (_, i) => i * 10 - 100).map((val) => {
                                            return (
                                                // eslint-disable-next-line react/jsx-key
                                                <MenuItem value={val}>{val}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ fontSize: 15, marginBottom: 1, marginTop: 2 }}>Maximum(%)</Typography>
                                <Select sx={{ minWidth: 150 }} value={max} onChange={e => setMax(Number(e.target.value))}>
                                    {
                                        Array.from({ length: 10 }, (_, i) => i * 10 + 10).map((val) => {
                                            return (
                                                // eslint-disable-next-line react/jsx-key
                                                <MenuItem value={val}>{val}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                            <FormControl>
                                <Typography sx={{ fontSize: 15, marginBottom: 1, marginTop: 2 }}>Increment(%)</Typography>
                                <Select sx={{ minWidth: 150 }} value={increment} onChange={e => setIncrement(Number(e.target.value))}>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={15}>15</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: 10 }}>
                            <div className="overflow-hidden">
                                <Typography sx={{ fontSize: 10, marginBottom: 1 }}>% Change in NPV</Typography>
                                <canvas
                                    ref={canvasCallback}
                                    style={{ minWidth: 500, }}
                                ></canvas>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>

    );
};

export default SensitivityTable;