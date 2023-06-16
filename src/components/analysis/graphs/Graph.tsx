import * as React from 'react';
import { Tab, Tabs, Grid, Select, MenuItem } from "@mui/material";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Modal } from '@components/ui';
import { useState, useEffect } from 'react';
import MChart from './MChart';

type Props = {
    variables: string[] | null;
    values: { [key: string]: any[] };
};


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Graph: React.FC<Props> = ({ variables, values }) => {
    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const stringVariables = variables?.map((variable) => variable.toString());

    const variableMapping: { [key: string]: string } = {
        'Ore Production': 'OreProduction',
        'Zinc Grade': 'ZincGrade',
        'Zinc Revenue': 'ZincRevenue',
        'Lead Grade': 'LeadGrade',
        'Lead Revenue': 'LeadRevenue',
        'Total Revenue': 'TotalRevenue',
        'Operating Cost': 'OperatingCost',
        'Operating Margin': 'OperatingMargin',
        'Capital Cost': 'CapitalCost',
        'Working Capital': 'WorkingCapital',
        'Royalties': 'Royalties',
        'Capital Allowances': 'CaptitalAllowances',
        'Taxable Income': 'TaxableIncome',
        'Corporate Taxes': 'CorporateTaxes',
        'Cashflow': 'Cashflow',
        'Cumulative Cashflow': 'CumulativeCashflow',
        'Discounted Cashflow': 'DiscountedCashflow',
        'Cumulative Discounted Cashflow': 'CumulativeDiscountedCashflow',
    };


    const borderColorMapping: { [key: string]: string } = {
        'Ore Production': '#FF0000', // Red
        'Zinc Grade': '#00FF00', // Green
        'Zinc Revenue': '#0000FF', // Blue
        'Lead Grade': '#FFA500', // Orange
        'Lead Revenue': '#800080', // Purple
        'Total Revenue': '#008080', // Teal
        'Operating Cost': '#FFC0CB', // Pink
        'Operating Margin': '#808000', // Olive
        'Capital Cost': '#800000', // Maroon
        'Working Capital': '#4B0082', // Indigo
        'Royalties': '#DAA520', // Goldenrod
        'Capital Allowances': '#DC143C', // Crimson
        'Taxable Income': '#8B4513', // SaddleBrown
        'Corporate Taxes': '#7B68EE', // MediumSlateBlue
        'Cashflow': '#2E8B57', // SeaGreen
        'Cumulative Cashflow': '#000080', // Navy
        'Discounted Cashflow': '#FF69B4', // HotPink
        'Cumulative Discounted Cashflow': '#FFD700', // Gold
    };

    const [chartType, setChartType] = React.useState('Line');

    const generateDatasets = (variables: string[] | undefined, values: { [key: string]: any[] }) => {
        if (!variables) return [];

        return variables.map((variable) => {
            let data = [0];
            const actualKey = variableMapping[variable] || variable;
            if (values[actualKey]) {
                for (let i = 0; i < 12; i++) {
                    data.push(values[actualKey][i]);
                }
            }

            return {
                label: variable,
                data: data,
                borderColor: borderColorMapping[variable] || "#8725B5",
                backgroundColor: borderColorMapping[variable] || "#8725B5",
            };
        });
    };

    const generateCumulativeDatasets = (variables: string[] | undefined, values: { [key: string]: any[] }) => {
        if (!variables) return [];

        return variables.map((variable) => {
            let data = [0];
            const actualKey = variableMapping[variable] || variable;
            if (values[actualKey]) {
                if (variable !== 'Cumulative Cashflow' && variable !== 'Cumulative Discounted Cashflow') {
                    let cumulativeValue = 0;
                    for (let i = 0; i < 12; i++) {
                        cumulativeValue += parseFloat(values[actualKey][i]);
                        data.push(cumulativeValue);
                    }
                } else {
                    for (let i = 0; i < 12; i++) {
                        data.push(parseFloat(values[actualKey][i]));
                    }
                }
            }

            return {
                label: variable,
                data: data,
                borderColor: borderColorMapping[variable] || "#8725B5",
                backgroundColor: borderColorMapping[variable] || "#8725B5",
            };
        });
    };

    const data = {
        labels: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
        datasets: generateDatasets(stringVariables, values),
    };

    return (
        <Modal title="Graph" /* add any additional modal props here */>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    paddingLeft: 3,
                    paddingRight: 3,
                    height: 'auto',
                    minHeight: 800,
                    width: '100%', // use '100%' for full width
                }}
                className="stormShadowNoTop"
            >
                <Grid container sx={{ paddingTop: 10 }}>
                    <Grid item xs={12}>
                        <Box className='mt-[-24px]' sx={{ marginLeft: 80 , display: 'flex'}}>
                            <Tabs value={value} onChange={handleChange} aria-label="Analysis Graph">
                                <Tab label="Time Series" {...a11yProps(0)} />
                                <Tab label="Cumulative" {...a11yProps(1)} />
                            </Tabs>
                            <Select
                                labelId={`demo-simple-select-label-1`}
                                id={`demo-simple-select-1`}
                                name="months"
                                onChange={(e) => {
                                    // console.log(e.target.value);
                                    setChartType("" + e.target.value);
                                }}
                                value={chartType}
                                sx={{width: 100, marginLeft: 2}}
                            >
                                <MenuItem value="Line">
                                    Line
                                </MenuItem>
                                <MenuItem value="Bar">
                                    Bar
                                </MenuItem>
                            </Select>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Stack direction="column" spacing={2}>
                                <div className="flex flex-col p-6 mt-5 grow">
                                    <MChart chartData={data.datasets} chartType={chartType} />
                                </div>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack direction="column" spacing={2}>
                                <div className="flex flex-col p-6 mt-5 grow">
                                    <MChart chartData={generateCumulativeDatasets(stringVariables, values)} chartType={chartType} />
                                </div>
                            </Stack>
                        </TabPanel>

                    </Grid>
                </Grid>
            </Box>
        </Modal>

    );
}

export default Graph;