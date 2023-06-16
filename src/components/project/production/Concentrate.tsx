import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, Tabs, Tab, Grid, FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import Table from '@components/ui/Table';
import TableLead from '@components/ui/Table/TableLead';
import SelectControl from '@components/selects/SelectControl';

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

interface ConData {
    Elements: string;
    Value: number;
    Units: string;
}

interface ConcentrateProps extends WithFormFieldsStateProps {
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
    onValidate: (formFieldsState: FormField[], requiredFields: string []) => boolean;
    subStepId: string;
}
const Concentrate: React.FC<ConcentrateProps> = ({
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
    const [C_ZC_Zn, setC_ZC_Zn] = useState<string | null>(null);
    const [C_ZC_H20, setC_ZC_H20] = useState<string | null>(null);
    const [C_ZC_Ag, setC_ZC_Ag] = useState<string | null>(null);
    const [C_ZC_Au, setC_ZC_Au] = useState<string | null>(null);
    const [C_ZC_Pb, setC_ZC_Pb] = useState<string | null>(null);
    const [C_ZC_Cu, setC_ZC_Cu] = useState<string | null>(null);
    const [C_ZC_Fe, setC_ZC_Fe] = useState<string | null>(null);
    const [C_ZC_Si02, setC_ZC_Si02] = useState<string | null>(null);
    const [C_ZC_As, setC_ZC_As] = useState<string | null>(null);

    const [C_PB_Zn, setC_PB_Zn] = useState<string | null>(null);
    const [C_PB_H20, setC_PB_H20] = useState<string | null>(null);
    const [C_PB_Ag, setC_PB_Ag] = useState<string | null>(null);
    const [C_PB_Au, setC_PB_Au] = useState<string | null>(null);
    const [C_PB_Pb, setC_PB_Pb] = useState<string | null>(null);
    const [C_PB_Cu, setC_PB_Cu] = useState<string | null>(null);
    const [C_PB_Fe, setC_PB_Fe] = useState<string | null>(null);
    const [C_PB_Si02, setC_PB_Si02] = useState<string | null>(null);
    const [C_PB_As, setC_PB_As] = useState<string | null>(null);

    const [C_Add_Element, setC_Add_Element] = useState<string | null>(null);
    const [C_Add_Value, setC_Add_Value] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'C_ZC_Zn') {
                    setC_ZC_Zn(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_H20') {
                    setC_ZC_H20(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Ag') {
                    setC_ZC_Ag(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Au') {
                    setC_ZC_Au(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Pb') {
                    setC_ZC_Pb(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Cu') {
                    setC_ZC_Cu(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Fe') {
                    setC_ZC_Fe(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_Si02') {
                    setC_ZC_Si02(fieldState.value);
                }
                if (fieldState.key === 'C_ZC_As') {
                    setC_ZC_As(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Zn') {
                    setC_PB_Zn(fieldState.value);
                }
                if (fieldState.key === 'C_PB_H20') {
                    setC_PB_H20(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Ag') {
                    setC_PB_Ag(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Au') {
                    setC_PB_Au(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Pb') {
                    setC_PB_Pb(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Cu') {
                    setC_PB_Cu(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Fe') {
                    setC_PB_Fe(fieldState.value);
                }
                if (fieldState.key === 'C_PB_Si02') {
                    setC_PB_Si02(fieldState.value);
                }
                if (fieldState.key === 'C_PB_As') {
                    setC_PB_As(fieldState.value);
                }
                if (fieldState.key === 'C_Add_Element') {
                    setC_Add_Element(fieldState.value);
                }
                if (fieldState.key === 'C_Add_Value') {
                    setC_Add_Value(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["C_ZC_Zn"];

    const handleValidate = () => {
        //check to see if C_ZC_Zn has a value above 0
        if (C_ZC_Zn === null || C_PB_Pb === null) {
            return false;
        }

        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleSelectControlValuesChange = (values: any[]) => {
        console.log('handleSelectControlValuesChange', values);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'C_ZC_Zn') {
            setC_ZC_Zn(value);
        }
        if (key === 'C_ZC_H20') {
            setC_ZC_H20(value);
        }
        if (key === 'C_ZC_Ag') {
            setC_ZC_Ag(value);
        }
        if (key === 'C_ZC_Au') {
            setC_ZC_Au(value);
        }
        if (key === 'C_ZC_Pb') {
            setC_ZC_Pb(value);
        }
        if (key === 'C_ZC_Cu') {
            setC_ZC_Cu(value);
        }
        if (key === 'C_ZC_Fe') {
            setC_ZC_Fe(value);
        }
        if (key === 'C_ZC_Si02') {
            setC_ZC_Si02(value);
        }
        if (key === 'C_ZC_As') {
            setC_ZC_As(value);
        }
        if (key === 'C_PB_Zn') {
            setC_PB_Zn(value);
        }
        if (key === 'C_PB_H20') {
            setC_PB_H20(value);
        }
        if (key === 'C_PB_Ag') {
            setC_PB_Ag(value);
        }
        if (key === 'C_PB_Au') {
            setC_PB_Au(value);
        }
        if (key === 'C_PB_Pb') {
            setC_PB_Pb(value);
        }
        if (key === 'C_PB_Cu') {
            setC_PB_Cu(value);
        }
        if (key === 'C_PB_Fe') {
            setC_PB_Fe(value);
        }
        if (key === 'C_PB_Si02') {
            setC_PB_Si02(value);
        }
        if (key === 'C_PB_As') {
            setC_PB_As(value);
        }
        if (key === 'C_Add_Element') {
            setC_Add_Element(value);
        }
        if (key === 'C_Add_Value') {
            setC_Add_Value(value);
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

    const [resourceData, setResourceData] = useState<ConData[]>([{
        Elements: "Silver",
        Value: 0,
        Units: "%"
    }]);

    return (
        <div>
            <div className="flex grow flex-col items-start h-full mt-5 p-6">
                <div className="flex flex-col w-full">
                    <Box sx={{ width: '100%' }}>
                        <Box className='mt-[-24px]'>
                            <Tabs value={value} onChange={handleChange} aria-label="Concentrate Table">
                                <Tab label="Zinc Concentrate" {...a11yProps(0)} />
                                <Tab label="Lead Concentrate" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <div className="mb-8 max-w-lg">
                                <Table
                                    onHandleInput={handleInputChange}
                                    C_ZC_Zn={C_ZC_Zn}
                                    C_ZC_H20={C_ZC_H20}
                                    C_ZC_Ag={C_ZC_Ag}
                                    C_ZC_Au={C_ZC_Au}
                                    C_ZC_Pb={C_ZC_Pb}
                                    C_ZC_Cu={C_ZC_Cu}
                                    C_ZC_Fe={C_ZC_Fe}
                                    C_ZC_Si02={C_ZC_Si02}
                                    C_ZC_As={C_ZC_As}
                                />
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className="mb-10 max-w-lg">
                                <TableLead
                                    onHandleInput={handleInputChange}
                                    C_PB_Zn={C_PB_Zn}
                                    C_PB_H20={C_PB_H20}
                                    C_PB_Ag={C_PB_Ag}
                                    C_PB_Au={C_PB_Au}
                                    C_PB_Pb={C_PB_Pb}
                                    C_PB_Cu={C_PB_Cu}
                                    C_PB_Fe={C_PB_Fe}
                                    C_PB_Si02={C_PB_Si02}
                                    C_PB_As={C_PB_As}
                                />
                            </div>
                        </TabPanel>

                        <h3 className="my-5">Additional Elements</h3>
                        <Grid container spacing={2} sx={{ maxWidth: 700, marginBottom: 2 }}>
                            <Grid item xs={4} md={4}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Elements</h6>
                                    <Select
                                        labelId={`demo-simple-select-label-${C_Add_Element}`}
                                        id={`demo-simple-select-${C_Add_Element}`}
                                        value="Silver"
                                        name="name"
                                    >
                                        <MenuItem value="Silver">
                                            Silver
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <h6 className="text-sm pb-2">Value</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="name"
                                    autoComplete="off"
                                    value={C_Add_Value}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleInputChange("C_Add_Value", value);
                                    }}
                                    type={"text"}
                                    InputProps={{
                                        inputProps: { min: 0 },
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Units</h6>
                                    <Select
                                        labelId={`demo-simple-select-label-${C_Add_Element}`}
                                        id={`demo-simple-select-${C_Add_Element}`}
                                        value="Gram"
                                        name="name"
                                    >
                                        <MenuItem value="Gram">
                                            Gram
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <SelectControl
                            onControlValuesChange={handleSelectControlValuesChange}
                            caption={"Add More Elements"}
                        />

                    </Box>
                </div>
            </div>
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

export default withFormFieldsState(Concentrate as React.ComponentType<Omit<ConcentrateProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);