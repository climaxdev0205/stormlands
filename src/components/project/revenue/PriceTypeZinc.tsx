import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, Tabs, Tab, Grid, FormControl, InputLabel, MenuItem, Select, TextField, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';

import DateRangePicker from "react-tailwindcss-datepicker";
import { DateRangeType } from 'react-tailwindcss-datepicker/dist/types';
import NumberFormatCustom from '@utils/NumberFormatMUI';


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

interface PriceTypeZincProps extends WithFormFieldsStateProps {
    onSave: (formFieldsState: FormField[], subStepID: string) => void;
    formFieldsState: FormField[];
    setFormFieldsState: (value: FormField[]) => void;
    activeStep: number;
    activeSubStep: number;
    isSubStepCompleted: (stepIndex: number, subStepIndex: number) => boolean;
    handleBack: () => void;
    handleNext: () => void;
    isLastStep: () => boolean;
    isLastSubStep: () => boolean;
    linear: boolean;
    completeSubStep: (stepIndex: number, subStepIndex: number) => void;
    onValidate: (formFieldsState: FormField[], requiredFields: string[]) => boolean;
    subStepId: string;
}
const PriceTypeZinc: React.FC<PriceTypeZincProps> = ({
    onSave,
    formFieldsState,
    setFormFieldsState,
    activeStep,
    activeSubStep,
    isSubStepCompleted,
    handleBack,
    handleNext,
    isLastStep,
    isLastSubStep,
    linear,
    completeSubStep,
    onValidate,
    subStepId,
}) => {
    const [validated, setValidated] = useState(false);

    //Values for field states
    const [Price_Z_PriceType_Fixed_Select, setPrice_Z_PriceType_Fixed_Select] = useState<string | null>(null);
    const [Price_Z_PriceType_Fixed_VolType, setPrice_Z_PriceType_Fixed_VolType] = useState<string | null>(null);

    const [dateHistoricalTo, setDateHistoricalTo] = useState<Date | null>(new Date());
    const [dateHistoricalFrom, setDateHistoricalFrom] = useState<Date | null>(new Date());
    const [dateFutureTo, setDateFutureTo] = useState<Date | null>(new Date());
    const [dateFutureFrom, setDateFutureFrom] = useState<Date | null>(new Date());

    // const [dateFeature, setDateFeature] = React.useState<DateRange<Dayjs>>([dayjs(),dayjs(),]);
    // const [dateHistoricalFeature, setDateHistoricalFeature] = React.useState<DateRange<Dayjs>>([dayjs(),dayjs(),]);


    const [dateFeature, setDateFeature] = useState<DateRangeType | null>({
        startDate: new Date(),
        endDate: new Date()
    });

    const [dateHistoricalFeature, setDateHistoricalFeature] = useState<DateRangeType | null>({
        startDate: new Date(),
        endDate: new Date()
    });

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);

        for (const div of document.querySelectorAll('div')) {
            if (div.childNodes.length == 1 && div.childNodes.item(0).nodeValue == "MUI X Missing license key") {
                div.remove()
            }
        }

        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Price_Z_PriceType_Fixed_Select') {
                    setPrice_Z_PriceType_Fixed_Select(fieldState.value);
                }
                if (fieldState.key === 'Price_Z_PriceType_Fixed_VolType') {
                    setPrice_Z_PriceType_Fixed_VolType(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["Price_Z_PriceType_Fixed_Select"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleSelectControlValuesChange = (values: any[]) => {
        console.log('handleSelectControlValuesChange', values);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'Price_Z_PriceType_Fixed_Select') {
            setPrice_Z_PriceType_Fixed_Select(value);
        }
        if (key === 'Price_Z_PriceType_Fixed_VolType') {
            setPrice_Z_PriceType_Fixed_VolType(value);
        }
        //update the formFieldsState with the new value
        const index = formFieldsState.findIndex((fieldState) => fieldState.key === key);
        console.log("index", index);
        //if a field with the key exists in the formFieldsState
        if (index > -1) {
            const newFormFieldsState = [...formFieldsState];
            newFormFieldsState[index].value = value;
            setFormFieldsState(newFormFieldsState);
            console.log('handleInputChange', formFieldsState);
        }
    };

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="flex flex-col p-6 mt-5 grow">
            <Grid container spacing={2} xs={8}>
                <Box sx={{ width: '100%' }}>
                    <Box className='mt-[-24px]'>
                        <Tabs value={value} onChange={handleChange} aria-label="PriceTypeZinc Table">
                            <Tab label="Historical" {...a11yProps(0)} />
                            <Tab label="Future" {...a11yProps(1)} />
                            <Tab label="Fixed" {...a11yProps(2)} />
                            <Tab label="Trending" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid container spacing={2} className="mb-24">
                            <Grid item xs={8} md={8}>
                                <div style={{ border: "2px solid grey", borderRadius: 10 }}>
                                    <DateRangePicker
                                        value={dateFeature}
                                        onChange={(newVal) => { setDateFeature(newVal) }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Grid container spacing={2} className="mb-24">
                            <Grid item xs={8} md={8}>
                                <div style={{ border: "2px solid grey", borderRadius: 10 }}>
                                    <DateRangePicker
                                        value={dateHistoricalFeature}
                                        onChange={(newVal) => { setDateHistoricalFeature(newVal) }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Grid container spacing={2} className="mb-8">
                            <Grid item xs={4} md={4}>
                                <h6 className="text-sm pb-2">Fixed Price (Amount)</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="name"
                                    autoComplete="off"
                                    value={Price_Z_PriceType_Fixed_Select}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleInputChange("Price_Z_PriceType_Fixed_Select", value);
                                    }}
                                    error={validated && !Price_Z_PriceType_Fixed_Select}
                                    helperText={
                                        validated &&
                                            (!Price_Z_PriceType_Fixed_Select || parseFloat(Price_Z_PriceType_Fixed_Select) <= 0)
                                            ? "Required and must be greater than 0"
                                            : ""
                                    }
                                    type={"number"}
                                    // inputProps={{
                                    //     inputMode: "numeric",
                                    //     min: "0",
                                    // }}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mb-10">
                            <Grid item xs={4} md={4}>
                                <FormControl>
                                    <h6 className="text-sm pb-2">Please Select Volatility Type</h6>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        // value={Price_Z_PriceType_Fixed_VolType}
                                        value={"Other"}
                                        onChange={(e) => handleInputChange('Price_Z_PriceType_Fixed_VolType', e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="Historical"
                                            control={<Radio />}
                                            label="Historical"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Implied"
                                            control={<Radio />}
                                            label="Implied"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Specified"
                                            control={<Radio />}
                                            label="Specified"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Grid container spacing={2} className="mb-8">
                            <Grid item xs={4} md={4}>
                                <h6 className="text-sm pb-2">Please Select Basic Price</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="name"
                                    autoComplete="off"
                                    type={"number"}
                                    inputProps={{
                                        inputMode: "numeric",
                                        min: "0",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mb-8">
                            <Grid item xs={4} md={4}>
                                <h6 className="text-sm pb-2">Please Define Return (%)</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="name"
                                    autoComplete="off"
                                    type={"number"}
                                    inputProps={{
                                        inputMode: "numeric",
                                        min: "0",
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mb-10">
                            <Grid item xs={4} md={4}>
                                <FormControl>
                                    <h6 className="text-sm pb-2">Please Select Volatility Type</h6>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        // value={Price_Z_PriceType_Fixed_Select}
                                        value={"Other"}
                                        onChange={(e) => handleInputChange('Price_Z_PriceType_Fixed_Select', e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="Historical"
                                            control={<Radio />}
                                            label="Historical"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Implied"
                                            control={<Radio />}
                                            label="Implied"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Specified"
                                            control={<Radio />}
                                            label="Specified"
                                            disabled={true}
                                        />
                                        <FormControlLabel
                                            value="Other"
                                            control={<Radio />}
                                            label="Other"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Box>
            </Grid>
            <Box position="relative" height="100%" className='mt-[-36px]'>
                <NavigationButtons
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    validateForm={handleValidate}
                    completeSubStepWithoutMoving={() => {
                        completeSubStep(activeStep, activeSubStep);
                        handleSave();
                    }
                    }
                />
            </Box>
        </div>
    );
};

export default withFormFieldsState(PriceTypeZinc as React.ComponentType<Omit<PriceTypeZincProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);