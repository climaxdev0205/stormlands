import * as React from 'react';
import {Tab, Tabs, Grid, Typography, Button} from "@mui/material";
import 'chart.js/auto'
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Modal } from '@components/ui';

import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DateRange } from '@mui/x-date-pickers-pro';


type Props = {
    values: any;
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

const Sensitivity: React.FC<Props> = ({ values }) => {
    const [value, setValue] = React.useState(0);
    const [dateValue, setDateValue] = React.useState<DateRange<Dayjs>>([
        dayjs(),
        dayjs(),
    ]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const LOM = values.LifeOfMine;
    const formattedLOM = !isNaN(parseFloat(LOM)) ? parseFloat(LOM).toFixed(2) : LOM;

    return (
        <Modal title="Sensitivity Analysis">
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.paper',
                    paddingLeft: 3,
                    paddingRight: 3,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 'auto',
                    minHeight: 800,
                    width: '100%',
                }}
                className="stormShadowNoTop"
            >
                <Typography sx={{textAlign: "center", my: "auto", paddingTop: 10, fontWeight: "bold"}} variant="h4">
                    Period of Time
                </Typography>
                <Grid container sx={{paddingTop: 5}} >
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="Sensitivity Analysis" >
                                <Tab label="Life of Mine" {...a11yProps(0)} />
                                {/* <Tab label="Calendar Period" {...a11yProps(1)} disabled /> */}
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Stack direction="column" spacing={2} >
                                <div className="flex flex-col p-6 mt-5 grow">
                                <Grid container spacing={2} 
                                        sx={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <Grid item xs={6} >
                                            <Typography sx={{textAlign: "center", my: "auto"}} variant="h6">
                                                Life of Mine: {formattedLOM} Years
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Stack>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Stack direction="column" spacing={2} >
                                <div className="flex flex-col p-6 mt-5 grow">
                                    <Grid container spacing={2} 
                                        sx={{
                                            alignItems: "center",
                                            justifyContent: "center",
                                            display: "flex",
                                        }}
                                    >
                                        <Grid item xs={6} >
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DateRangePicker
                                                    defaultValue={dateValue}
                                                    onChange={(newValue) => {
                                                        setDateValue(newValue);
                                                    }}
                                                    slotProps={{ textField: { size: "small" }}}
                                                    disablePast={true}
                                                />
                                            </LocalizationProvider>    
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={2} sx={{marginTop: 5}}>
                                        <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Button variant={"contained"} sx={{paddingLeft: 3, paddingRight: 3, fontSize: 20}}>
                                                Add Calendar Period
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Stack>
                        </TabPanel>
                    </Grid>
                </Grid>
            </Box>
        </Modal>

    );
}

export default Sensitivity;