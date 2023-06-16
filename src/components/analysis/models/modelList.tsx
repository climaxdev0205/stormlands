import React, {useMemo, useState, useEffect, useRef} from 'react';
import DataTable from "react-data-table-component";
import {IconButton, Grid, Button, Typography, Box, Tabs, Tab} from "@mui/material";
import DFCTable from "@components/analysis/models/Table";
import { BsArrowLeft } from "react-icons/bs";
import { Modal } from '@components/ui';
import { calculateNPV } from '../formulas/NPV';
import { calculateIRR } from '../formulas/IRR2';
import Stack from "@mui/material/Stack";
import {calculateValues} from "../formulas/Calculations";
import {Chart, ChartData} from "chart.js/auto";

interface Props {
    projectName: string | undefined;
    variables: string[] | null;
    values: any;
    discountRates: number[];
    setIsSidebarOpen: (data: boolean) => void;
    onChangeDiscountRate: (data: any) => void;
    version: any;
}

type Table = {
    id: any | null,
    dr: any | null,
    npv: any | null,
    irr: any | null,
}

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

const ModelList: React.FC<Props> = ({ projectName, variables, values, discountRates, setIsSidebarOpen, onChangeDiscountRate, version }) => {

    const tableData = discountRates.map((dr, index) => {

        const value = calculateValues(version, dr);
        let irrResult = calculateIRR(value.DiscountedCashflow.map(parseFloat));
        const irr = (irrResult ? irrResult * 100 : 0).toFixed(2);
        const cashFlowsAsNumbers = values.Cashflow.map(parseFloat);     
        const npv = calculateNPV(dr, ...cashFlowsAsNumbers).toFixed(0);
        return {
            id: index + 1,
            dr: dr,
            npv: npv,
            irr: irr,
        };
    });

    const formatNPVChartData = (tableData: Table[]): ChartData => {
        const npvData = tableData.map((row) => ({ x: row.dr, y: (parseFloat(row.npv)), }));
    
        return {
            labels: tableData.map((row) => row.dr),
            datasets: [
                {
                    label: 'NPV',
                    borderColor: 'purple',
                    data: npvData,
                },
            ],
        };
    };

    const formatIRRChartData = (tableData: Table[]): ChartData => {
        const irrData = tableData.map((row) => ({ x: row.dr, y: (parseFloat(row.irr)), }));
        return {
            labels: tableData.map((row) => row.dr),
            datasets: [
                {
                    label: 'IRR',
                    borderColor: 'orange',
                    data: irrData,
                },
            ],
        };
    };

    const [selectedId, setSelectedId] = useState<boolean | null>(false);
    const [selectedRow, setSelectedRow] = useState<Table | null>(null);
    const [selectedButton, setSelectedButton] = useState<number>(0);
    const [showData, setShowData] = useState<Table[]>(tableData);
    const [openVModal, setOpenVModal] = useState<boolean>(false);
    const [selectedMonths, setSelectedMonth] = useState<number>(0);
    const [value, setValue] = React.useState(0);
    const [NPVChartData, setNPVChartData] = useState<ChartData>(formatNPVChartData(tableData));
    const [IRRChartData, setIRRChartData] = useState<ChartData>(formatIRRChartData(tableData));

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleOpenVModal = () => {
        setOpenVModal(true);
    };

    const handleCloseVModal = () => {
        setOpenVModal(false);
    };

    const columns = useMemo(
        () => [
            {
                name: 'ID',
                selector: (row: { id: any; }) => row.id,
                omit: true,
            },
            {
                name: 'Discount Rate(%)',
                selector: (row: { dr: any; }) => row.dr,
                sortable: true,
                right: true,
            },
            {
                name: 'NPV(USD)',
                selector: (row: { npv: any; }) => row.npv,
                sortable: true,
                right: true,
                wrap: true,
            },
            {
                name: 'IRR(%)',
                selector: (row: { irr: any; }) => row.irr,
                sortable: true,
                right: true,
            },
        ],
        [],
    );

    const handleButtonClick = (index: number) => {
        if (index === 0) {
            setShowData(tableData);
            setNPVChartData(formatNPVChartData(tableData));
            setIRRChartData(formatIRRChartData(tableData));
            setSelectedButton(index);
            return;
        }
        let showData: Table[] = [];
        tableData.forEach((data) => {
            if (data.dr >= index && data.dr <= index + 2) {
                showData.push(data);
            }
        })
        setShowData(showData);
        setNPVChartData(formatNPVChartData(showData));
        setIRRChartData(formatIRRChartData(showData));
        setSelectedButton(index);
    };
    
 
    const tableStyle = {
        border: '1px solid #ddd', // add border
        borderRadius: '4px', // add border radius
        overflow: 'hidden', // hide overflow
    };

    const selectedButtonStyle = {
        width: 75,
        height: 40,
        marginRight: 2,
        backgroundColor: 'blue', // Update with the desired background color for selected buttons
        color: 'white', // Update with the desired text color for selected buttons
    };
    const unselectedButtonStyle = {
        width: 75,
        height: 40,
        marginRight: 2,
    };

    const discountRateButtonForm = (index: number) => {
        const text = `${index} - ${index + 2}`
        return (<Button
            sx={selectedButton === index ? selectedButtonStyle : unselectedButtonStyle}
            variant={selectedButton === index ? 'contained' : 'outlined'}
            onClick={() => handleButtonClick(index)}
        >
            {text}
        </Button>)
    }

    // use a ref to store the chart instance since it mutable
    const chartRef = useRef<Chart | null>(null);
    const chartId = useRef<string | null>(null);

    // callback creates the chart on the canvas element
    const canvasNPV = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
                    // Destroy the existing chart instance before creating a new one
        if (chartRef.current) {
            chartRef.current.destroy();
        }
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: NPVChartData,
                options: {
                    scales: {
                        x: {
                            suggestedMin: Math.min(...tableData.map((row) => row.dr)),
                            suggestedMax: Math.max(...tableData.map((row) => row.dr)),
                        },
                        y: {
                            suggestedMin: Math.min(...tableData.map((row) => parseFloat(row.npv))),
                            suggestedMax: Math.max(...tableData.map((row) => parseFloat(row.npv))),
                        },
                    },
                },
            });
        }
    };

    const canvasIRR = (canvas: HTMLCanvasElement | null) => {
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
            // Destroy the existing chart instance before creating a new one
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: 'line',
                data: IRRChartData,
                options: {
                    scales: {
                        x: {
                            suggestedMin: Math.min(...tableData.map((row) => row.dr)),
                            suggestedMax: Math.max(...tableData.map((row) => row.dr)),
                        },
                        y: {
                            suggestedMin: Math.min(...tableData.map((row) => parseFloat(row.irr))),
                            suggestedMax: Math.max(...tableData.map((row) => parseFloat(row.irr))),
                            min: 0, // Set the minimum value of y-axis to 0
                            max: 100, // Set the maximum value of y-axis to 100
                            ticks: {
                                stepSize: 10, // Define the step size for y-axis ticks
                            },
                        },
                    },
                },
            });
        }
    };
    
    useEffect(() => {
        if (chartRef.current) {
            if (value === 1) { // NPV Chart
                chartRef.current.data = NPVChartData;
            } else if (value === 2) { // IRR Chart
                chartRef.current.data = IRRChartData;
            }
            chartRef.current.update();
        }
    }, [NPVChartData, IRRChartData]);
    

    return (
        <>
            {selectedId ? (
                <Modal title="Models" /* add any additional modal props here */>
                    <Box
                        sx={{
                            flexGrow: 1,
                            bgcolor: 'background.paper',
                            paddingLeft: 3,
                            paddingRight: 3,
                            paddingTop: 3,
                            height: 'auto',
                            minHeight: 800,
                            width: '100%', // use '100%' for full width
                        }}
                        className="stormShadowNoTop"
                    >
                        <Grid container sx={{marginBottom: 2}}>
                            <Grid xs={2} alignItems="center">
                                <Typography
                                    onClick={()=> {setSelectedId(false); setIsSidebarOpen(true);}}
                                    sx={{fontSize: 14, display: "flex", alignItems: "Center"}}
                                >
                                    <BsArrowLeft/>
                                    Back to Models
                                </Typography>
                            </Grid>
                            <Grid xs={6}/>
                            <Grid xs={2}>
                                <Button sx={{width: 150}} disabled={true} variant="outlined">Save as PDF</Button>
                            </Grid>
                            <Grid xs={2}>
                                <Button sx={{width: 150}} disabled={true} variant="outlined">Send as Email</Button>
                            </Grid>
                        </Grid>
                        <Grid container sx={{bgcolor: "white", alignItems: 'center', marginBottom: 3}}>
                            <Grid item xs={2} >
                                <Typography sx={{fontSize: 15, fontWeight: 600, marginTop: 5, marginBottom: 5}}>{projectName}</Typography>
                            </Grid>
                            {/* <Grid item xs={2}>
                                <Button onClick={handleOpenVModal}>Hidden Fields</Button>
                            </Grid>
                            <Grid item xs={2}>
                                <FormControl
                                    fullWidth
                                    size="small"
                                >
                                    <Select
                                        labelId={`demo-simple-select-label-1`}
                                        id={`demo-simple-select-1`}
                                        name="months"
                                        value={selectedMonths}
                                        onChange={(e) => {
                                            console.log(e.target.value)
                                            const value = e.target.value;
                                            // @ts-ignore
                                            setSelectedMonth(value);
                                        }}
                                        sx={{fontSize: 12}}
                                    >
                                        <MenuItem value="0" disabled>
                                            Number of Months
                                        </MenuItem>
                                        {[1,2,3,4,5,6,7,8,9,10,11,12].map((month) => {
                                            return <MenuItem key={month} value={month}>{month}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sx={{paddingLeft: 3}}>
                                <Button >Filter</Button>
                            </Grid> */}
                        </Grid>
                        <Grid container sx={{marginBottom: 2}}>
                            <Grid item xs={12}>
                                <div className='text-center outline outline-offset-2 outline-[#EEEFF1] rounded-sm'>
                                    <DFCTable
                                        variables={variables}
                                        values={values}
                                        selectedRow={selectedRow}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            ) : (
                <Modal title="Models" /* add any additional modal props here */>
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
                        <Grid container> {/* use container to create a grid */}
                            <Grid item xs={2} >
                                <Typography sx={{fontSize: 15, fontWeight: 600, marginTop: 5, marginBottom: 5}}>Discount Rate %</Typography>
                            </Grid>
                            <Grid item xs={8} sx={{display: 'flex', alignItems: 'center',}}>
                                <Button
                                    sx={selectedButton === 0 ? selectedButtonStyle : unselectedButtonStyle}
                                    variant={selectedButton === 0 ? 'contained' : 'outlined'}
                                    onClick={() => handleButtonClick(0)}
                                >
                                    All
                                </Button>
                                {[4,6,8].map(
                                    (index) => discountRateButtonForm(index)
                                )}
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="Sensitivity Analysis" >
                                        <Tab label="Table" {...a11yProps(0)} />
                                        <Tab label="NPV" {...a11yProps(1)} />
                                        <Tab label="IRR" {...a11yProps(2)} />
                                    </Tabs>
                                </Box>
                            </Grid>
                        </Grid>
                        <TabPanel value={value} index={0}>
                            <Stack direction="column" spacing={2}>
                                <Grid container>
                                    <Grid item xs={12} sx={{ marginBottom: 2 }}>
                                        <DataTable
                                            columns={columns}
                                            data={showData}
                                            title=""
                                            onRowClicked={(row) => {
                                                setSelectedId(true);
                                                setIsSidebarOpen(false);
                                                setSelectedRow(row);
                                                onChangeDiscountRate(row.dr)
                                            }}
                                            selectableRows
                                            pagination
                                            striped
                                            highlightOnHover
                                            pointerOnHover
                                            style={tableStyle} // add table style
                                            responsive
                                            noDataComponent="No data found."
                                            paginationPerPage={20}
                                            paginationRowsPerPageOptions={[5, 10, 20]}
                                            paginationComponentOptions={{
                                                rowsPerPageText: 'Rows per page:',
                                                rangeSeparatorText: 'of',
                                                noRowsPerPage: false,
                                                selectAllRowsItem: false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack direction="column" spacing={2}>
                                <canvas
                                    ref={canvasNPV}
                                    style={{ minWidth: 500, }}
                                ></canvas>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <Stack direction="column" spacing={2}>
                                <canvas
                                    ref={canvasIRR}
                                    style={{ minWidth: 500, }}
                                ></canvas>
                            </Stack>
                        </TabPanel>

                    </Box>
                </Modal>
            )}
        </>


    );
};

export default ModelList;