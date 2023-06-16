import Grid from "@mui/material/Grid";
import { Button, Input } from "@components/ui";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import React, { useEffect, useMemo, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import { FormField } from "src/API";
import NavigationButtons from "@components/project/NavigationButtons";
import { Radio, RadioGroup, Tab, Tabs } from "@mui/material";
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

interface EnvironmentalClosureProps extends WithFormFieldsStateProps {
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

const EnvironmentalClosure: React.FC<EnvironmentalClosureProps> = ({
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
    subStepId
}) => {
    const [validated, setValidated] = useState(false);
    //Values for field states
    const [E_Closure_Lump, setE_Closure_Lump] = useState<string | null>(null);
    const [E_Closure_Lump_TOC, setE_Closure_Lump_TOC] = useState<string | null>(null);
    const [E_Closure_Lump_Capex, setE_Closure_Lump_Capex] = useState<string | null>(null);
    const [E_Closure_Lump_Fixed, setE_Closure_Lump_Fixed] = useState<string | null>(null);
    
    const [E_Closure_Sink, setE_Closure_Sink] = useState<string | null>(null);
    const [E_Closure_Sink_TOC, setE_Closure_Sink_TOC] = useState<string | null>(null);
    const [E_Closure_Sink_Capex, setE_Closure_Sink_Capex] = useState<string | null>(null);
    const [E_Closure_Sink_Fixed, setE_Closure_Sink_Fixed] = useState<string | null>(null);
    
    const [E_Closure_Annual, setE_Closure_Annual] = useState<string | null>(null);
    const [E_Closure_Annual_TOC, setE_Closure_Annual_TOC] = useState<string | null>(null);
    const [E_Closure_Annual_Capex, setE_Closure_Annual_Capex] = useState<string | null>(null);
    const [E_Closure_Annual_Fixed, setE_Closure_Annual_Fixed] = useState<string | null>(null);

    const [LumpOperating, setLumpOperating] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [LumpCapex, setLumpCapex] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [LumpFixed, setLumpFixed] = React.useState<object>({ marginBottom: 1, display: "none" });

    const [SinkOperating, setSinkOperating] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [SinkCapex, setSinkCapex] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [SinkFixed, setSinkFixed] = React.useState<object>({ marginBottom: 1, display: "none" });

    const [AnnualOperating, setAnnualOperating] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [AnnualCapex, setAnnualCapex] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [AnnualFixed, setAnnualFixed] = React.useState<object>({ marginBottom: 1, display: "none" });

    useEffect(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'E_Closure_Lump') {
                    setE_Closure_Lump(fieldState.value);
                    if (fieldState.value === "Total Operating Costs") {
                        setLumpOperating({ marginBottom: 1, display: "block" })
                        setLumpCapex({ marginBottom: 1, display: "none" })
                        setLumpFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Total Capex") {
                        setLumpOperating({ marginBottom: 1, display: "none" })
                        setLumpCapex({ marginBottom: 1, display: "block" })
                        setLumpFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Fixed Amount") {
                        setLumpOperating({ marginBottom: 1, display: "none" })
                        setLumpCapex({ marginBottom: 1, display: "none" })
                        setLumpFixed({ marginBottom: 1, display: "block" })
                    }
                }
                if (fieldState.key === 'E_Closure_Lump_TOC') {
                    setE_Closure_Lump_TOC(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Lump_Capex') {
                    setE_Closure_Lump_Capex(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Lump_Fixed') {
                    setE_Closure_Lump_Fixed(fieldState.value);
                }

                if (fieldState.key === 'E_Closure_Sink') {
                    setE_Closure_Sink(fieldState.value);
                    if (fieldState.value === "Total Operating Costs") {
                        setSinkOperating({ marginBottom: 1, display: "block" })
                        setSinkCapex({ marginBottom: 1, display: "none" })
                        setSinkFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Total Capex") {
                        setSinkOperating({ marginBottom: 1, display: "none" })
                        setSinkCapex({ marginBottom: 1, display: "block" })
                        setSinkFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Fixed Amount") {
                        setSinkOperating({ marginBottom: 1, display: "none" })
                        setSinkCapex({ marginBottom: 1, display: "none" })
                        setSinkFixed({ marginBottom: 1, display: "block" })
                    }
                }
                if (fieldState.key === 'E_Closure_Sink_TOC') {
                    setE_Closure_Sink_TOC(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Sink_Capex') {
                    setE_Closure_Sink_Capex(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Sink_Fixed') {
                    setE_Closure_Sink_Fixed(fieldState.value);
                }

                if (fieldState.key === 'E_Closure_Annual') {
                    setE_Closure_Annual(fieldState.value);
                    if (fieldState.value === "Total Operating Costs") {
                        setAnnualOperating({ marginBottom: 1, display: "block" })
                        setAnnualCapex({ marginBottom: 1, display: "none" })
                        setAnnualFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Total Capex") {
                        setAnnualOperating({ marginBottom: 1, display: "none" })
                        setAnnualCapex({ marginBottom: 1, display: "block" })
                        setAnnualFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Fixed Amount") {
                        setAnnualOperating({ marginBottom: 1, display: "none" })
                        setAnnualCapex({ marginBottom: 1, display: "none" })
                        setAnnualFixed({ marginBottom: 1, display: "block" })
                    }
                }
                if (fieldState.key === 'E_Closure_Annual_TOC') {
                    setE_Closure_Annual_TOC(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Annual_Capex') {
                    setE_Closure_Annual_Capex(fieldState.value);
                }
                if (fieldState.key === 'E_Closure_Annual_Fixed') {
                    setE_Closure_Annual_Fixed(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields: string | any[] = [];
    
    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'E_Closure_Lump') {
            setE_Closure_Lump(value);
            if (value == 'Total Operating Costs') {
                handleInputChange('E_Closure_Lump_Capex', '0');
                handleInputChange('E_Closure_Lump_Fixed', '');
            }
            else if (value == 'Total Capex') {
                handleInputChange('E_Closure_Lump_TOC', '0');
                handleInputChange('E_Closure_Lump_Fixed', '');
            }
            else if (value == 'Fixed Amount') {
                handleInputChange('E_Closure_Lump_Capex', '0');
                handleInputChange('E_Closure_Lump_TOC', '0');
            }
        }
        if (key === 'E_Closure_Lump_TOC') {
            setE_Closure_Lump_TOC(value);
        }
        if (key === 'E_Closure_Lump_Capex') {
            setE_Closure_Lump_Capex(value);
        }
        if (key === 'E_Closure_Lump_Fixed') {
            setE_Closure_Lump_Fixed(value);
        }

        if (key === 'E_Closure_Sink') {
            setE_Closure_Sink(value);
        }
        if (key === 'E_Closure_Sink_TOC') {
            setE_Closure_Sink_TOC(value);
        }
        if (key === 'E_Closure_Sink_Capex') {
            setE_Closure_Sink_Capex(value);
        }
        if (key === 'E_Closure_Sink_Fixed') {
            setE_Closure_Sink_Fixed(value);
        }

        if (key === 'E_Closure_Annual') {
           setE_Closure_Annual(value);
            if (value == 'Total Operating Costs') {
                handleInputChange('E_Closure_Annual_Capex', '0');
                handleInputChange('E_Closure_Annual_Fixed', '');
            }
            else if (value == 'Total Capex') {
                handleInputChange('E_Closure_Annual_TOC', '0');
                handleInputChange('E_Closure_Annual_Fixed', '');
            }
            else if (value == 'Fixed Amount') {
                handleInputChange('E_Closure_Annual_Capex', '0');
                handleInputChange('E_Closure_Annual_TOC', '0');
            }
        }
        if (key === 'E_Closure_Annual_TOC') {
            setE_Closure_Annual_TOC(value);
        }
        if (key === 'E_Closure_Annual_Capex') {
            setE_Closure_Annual_Capex(value);
        }
        if (key === 'E_Closure_Annual_Fixed') {
            setE_Closure_Annual_Fixed(value);
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
            // if Lump Sum tab is selected, clear all Annual values
    if (newValue === 0) {
        handleInputChange('E_Closure_Annual', '');
        handleInputChange('E_Closure_Annual_TOC', '');
        handleInputChange('E_Closure_Annual_Capex', '');
        handleInputChange('E_Closure_Annual_Fixed', '');
    }
    // if Annual tab is selected, clear all Lump Sum values
    if (newValue === 2) {
        handleInputChange('E_Closure_Lump', '');
        handleInputChange('E_Closure_Lump_TOC', '');
        handleInputChange('E_Closure_Lump_Capex', '');
        handleInputChange('E_Closure_Lump_Fixed', '');
    };
    }
    return (
        <div className="flex flex-col p-6 mt-5 grow">
            <div className="flex flex-col w-full">
                <Box sx={{ width: '100%' }}>
                    <Box className='mt-[-24px]'>
                        <Tabs value={value} onChange={handleChange} aria-label="Environmental Closure">
                            <Tab label="Lump Sum" {...a11yProps(0)} />
                            <Tab label="Sink Fund" disabled={true} {...a11yProps(1)} />
                            <Tab label="Annual Cost" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <FormControl>
                            <h6 className="text-sm pb-2">Please Select</h6>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={E_Closure_Lump}
                                onChange={(e) => {
                                    handleInputChange('E_Closure_Lump', e.target.value);
                                }}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="Total Operating Costs"
                                    control={<Radio />}
                                    label="Total Operating Costs"
                                />
                                <Grid item sx={LumpOperating}>
                                    <h6 className="text-sm pb-2">Total Operating Costs (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Lump_TOC"
                                        autoComplete="off"
                                        value={E_Closure_Lump_TOC}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Lump_TOC", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Total Capex"
                                    control={<Radio />}
                                    label="Total Capex"
                                />
                                <Grid item sx={LumpCapex}>
                                    <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Lump_Capex"
                                        autoComplete="off"
                                        value={E_Closure_Lump_Capex}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Lump_Capex", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Fixed Amount"
                                    control={<Radio />}
                                    label="Fixed Amount"
                                />
                                <Grid item sx={LumpFixed}>
                                    <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                    <Grid sx={{ display: "flex", flexDirection: "row", maxHeight: 40 }}>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="E_Closure_Lump_Fixed"
                                            autoComplete="off"
                                            value={E_Closure_Lump_Fixed}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                handleInputChange("E_Closure_Lump_Fixed", value);
                                            }}
                                            type={"number"}
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                            }}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                                  </Grid>
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <FormControl>
                            <h6 className="text-sm pb-2">Please Select</h6>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={E_Closure_Sink}
                                onChange={(e) => {
                                    handleInputChange('E_Closure_Sink', e.target.value)
                                }}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="Total Operating Costs"
                                    control={<Radio />}
                                    label="Total Operating Costs"
                                />
                                <Grid item sx={SinkOperating}>
                                    <h6 className="text-sm pb-2">Total Operating Costs (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Sink_TOC"
                                        autoComplete="off"
                                        value={E_Closure_Sink_TOC}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Sink_TOC", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Total Capex"
                                    control={<Radio />}
                                    label="Total Capex"
                                />
                                <Grid item sx={SinkCapex}>
                                    <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Sink_Capex"
                                        autoComplete="off"
                                        value={E_Closure_Sink_Capex}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Sink_Capex", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Fixed Amount"
                                    control={<Radio />}
                                    label="Fixed Amount"
                                />
                                <Grid item sx={SinkFixed}>
                                    <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Sink_Fixed"
                                        autoComplete="off"
                                        value={E_Closure_Sink_Fixed}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Sink_Fixed", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <FormControl>
                            <h6 className="text-sm pb-2">Please Select</h6>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={E_Closure_Annual}
                                onChange={(e) => {
                                    handleInputChange('E_Closure_Annual', e.target.value)
                                }}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value="Total Operating Costs"
                                    control={<Radio />}
                                    label="Total Operating Costs"
                                />
                                <Grid item sx={AnnualOperating}>
                                    <h6 className="text-sm pb-2">Total Operating Costs (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Annual_TOC"
                                        autoComplete="off"
                                        value={E_Closure_Annual_TOC}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Annual_TOC", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Total Capex"
                                    control={<Radio />}
                                    label="Total Capex"
                                />
                                <Grid item sx={AnnualCapex}>
                                    <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Annual_Capex"
                                        autoComplete="off"
                                        value={E_Closure_Annual_Capex}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Annual_Capex", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                                <FormControlLabel
                                    value="Fixed Amount"
                                    control={<Radio />}
                                    label="Fixed Amount"
                                />
                                <Grid item sx={AnnualFixed}>
                                    <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="E_Closure_Annual_Fixed"
                                        autoComplete="off"
                                        value={E_Closure_Annual_Fixed}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("E_Closure_Annual_Fixed", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </TabPanel>
                </Box>
            </div>

            <Box position="relative" height="100%" >
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
                    }}
                />
            </Box>
        </div>
    );
};

export default withFormFieldsState(EnvironmentalClosure as React.ComponentType<Omit<EnvironmentalClosureProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);
