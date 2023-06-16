import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Switch, TextField, Button } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import SelectControl from '@components/selects/SelectControl';

interface PayablesProps extends WithFormFieldsStateProps {
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

const Payables: React.FC<PayablesProps> = ({
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
    const [Payables_Z_Payable, setPayables_Z_Payable] = useState<string | null>(null);
    const [Payables_Z_Payable_Zinc, setPayables_Z_Payable_Zinc] = useState<string | null>(null);
    const [Payables_Z_Payable_Germanium, setPayables_Z_Payable_Germanium] = useState<string | null>(null);
    const [Payables_Z_Payable_Silver, setPayables_Z_Payable_Silver] = useState<string | null>(null);
    const [Payables_Z_PayPercentage, setPayables_Z_PayPercentage] = useState<string | null>(null);
    const [Payables_Z_Subject, setPayables_Z_Subject] = useState<string | null>(null);
    const [Payables_Z_Deductions, setPayables_Z_Deductions] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Payables_Z_Payable') {
                    setPayables_Z_Payable(fieldState.value);
                }
                if (fieldState.key === 'Payables_Z_PayPercentage') {
                    setPayables_Z_PayPercentage(fieldState.value);
                }
                if (fieldState.key === 'Payables_Z_Subject') {
                    setPayables_Z_Subject(fieldState.value);
                }
                if (fieldState.key === 'Payables_Z_Deductions') {
                    setPayables_Z_Deductions(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields: string | any[] = [];

    const getInitialSelectedOres = () => {
        const ores = [];

        if (Payables_Z_Payable !== null && Payables_Z_Payable !== "") {
            ores.push({ ore: "Zinc", value: Payables_Z_Payable, unit: "%" });
        }

        if (Payables_Z_Payable_Germanium !== null && Payables_Z_Payable_Germanium !== "") {
            ores.push({ ore: "Germanium", value: Payables_Z_Payable_Germanium, unit: "%" });
        }

        if (Payables_Z_Payable_Silver !== null && Payables_Z_Payable_Silver !== "") {
            ores.push({ ore: "Silver", value: Payables_Z_Payable_Silver, unit: "%" });
        }

        return ores;
    };

    const [selectedOres, setSelectedOres] = useState<any[]>(getInitialSelectedOres());

    const updateSelectedOres = (currentOres: any[], oreType: string, oreValue: string | null) => {
        const updatedConcentrates = [...currentOres];
        const existingConcentrateIndex = updatedConcentrates.findIndex((conc) => conc.concentrate === oreType);

        if (oreValue) {
            if (existingConcentrateIndex !== -1) {
                updatedConcentrates[existingConcentrateIndex] = { ore: oreType, value: oreValue };
            } else {
                updatedConcentrates.push({ ore: oreType, value: oreValue});
            }
        } else {
            if (existingConcentrateIndex !== -1) {
                updatedConcentrates.splice(existingConcentrateIndex, 1);
            }
        }

        return updatedConcentrates;
    };

    useEffect(() => {
        setSelectedOres((currentOres) => updateSelectedOres(currentOres, "Zinc", Payables_Z_Payable));
    }, [Payables_Z_Payable]);

    useEffect(() => {
        setSelectedOres((currentOres) => updateSelectedOres(currentOres, "Germanium", Payables_Z_Payable_Germanium));
    }, [Payables_Z_Payable_Germanium]);

    useEffect(() => {
        setSelectedOres((currentOres) => updateSelectedOres(currentOres, "Silver", Payables_Z_Payable_Silver));
    }, [Payables_Z_Payable_Silver]);

    const handleOreChange = (index: number, field: string, value: any) => {
        const newSelectedOres = [...selectedOres];
        const otherOreIndex = index === 0 ? 1 : 0;

        if (selectedOres.length === 0 && index === 0) {
            newSelectedOres[index] = {ore: "", value: ""}
        }

        if (field === "ore") {
            if (newSelectedOres.length > 1 && newSelectedOres[otherOreIndex].ore === value) {
                newSelectedOres[otherOreIndex].ore = "";
                newSelectedOres[otherOreIndex].value = "";
            }
            newSelectedOres[index].ore = value;
        } else if (field === "value") {
            newSelectedOres[index].value = value;
        }

        setSelectedOres(newSelectedOres);

        console.log(`${newSelectedOres[index].ore}`, value)

        if (field === "value") {
            handleInputChange(`${newSelectedOres[index].ore}`, value);
        }
    };

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };
    const handleSelectControlValuesChange = (values: any[]) => {
        console.log('handleSelectControlValuesChange', values);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'Payables_Z_Payable') {
            setPayables_Z_Payable(value);
        }
        if (key === 'Payables_Z_PayPercentage') {
            setPayables_Z_PayPercentage(value);
        }
        if (key === 'Payables_Z_Subject') {
            setPayables_Z_Subject(value);
        }
        if (key === 'Payables_Z_Deductions') {
            setPayables_Z_Deductions(value);
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

    interface PayableData {
        Value: string,
        Units: string
    }

    const [resourceData, setResourceData] = useState<PayableData[]>([{
        Value: "0",
        Units: "%"
    }]);

    const removeItemAt = (index: number) => {
        setResourceData(resourceData.filter((_, i) => { return i !== index }));
    }

    const addItem = (nData: PayableData) => {
        setResourceData([...resourceData, nData]);
    }

    return (
        <div>
            <div className="flex grow flex-col items-start h-full mt-5 p-6">
                <div style={{ width: "100%" }}>
                    <Grid container spacing={2} sx={{ maxWidth: 700, marginBottom: 1 }}>
                        <Grid item xs={3} md={3}>
                            <FormControl
                                sx={{ minWidth: 60, maxWidth: 500 }}
                                fullWidth
                                size="small"
                            >
                                <h6 className="text-sm pb-2 mt-6">Payable</h6>
                                <Select
                                    labelId={`demo-simple-select-label-${Payables_Z_Payable}`}
                                    id={`demo-simple-select-${Payables_Z_Payable}`}
                                    value="Zinc"
                                    name="name"
                                >
                                    <MenuItem value="Zinc">
                                        Zinc
                                    </MenuItem>
                                    <MenuItem value="Germanium" disabled={true}>
                                        Germanium
                                    </MenuItem>
                                    <MenuItem value="Silver" disabled={true}>
                                        Silver
                                    </MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <FormControl
                                sx={{ minWidth: 60, maxWidth: 500 }}
                                fullWidth
                                size="small"
                            >
                                <h6 className="text-sm pb-2 mt-6">Pay Percentage (%)</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                name="name"
                                autoComplete="off"
                                value={Payables_Z_Payable}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Payables_Z_Payable", value);
                                }}
                                defaultValue={85}
                                type={"number"}
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} >
                        <FormControl>
                            <h6 className="text-sm pb-2 mt-6">Subject</h6>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={false}
                                // value={Payables_Z_Subject}
                                // onChange={(e) => { handleInputChange('Payables_Z_Subject', e.target.value) }}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Maximum"
                                    disabled={true}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Minimum"
                                    
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} sx={{ maxWidth: 700, marginBottom: 1, marginTop: 2 }}>
                        <Grid item xs={3} md={3}>
                            <h6 className="text-sm pb-2">Deductions</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                name="name"
                                autoComplete="off"
                                value={Payables_Z_Deductions}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Payables_Z_Deductions", value);
                                }}
                                defaultValue={8}
                                type={"number"}
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <FormControl
                                sx={{ minWidth: 60, maxWidth: 500 }}
                                fullWidth
                                size="small"
                            >
                                <h6 className="text-sm pb-2">Units</h6>
                                <Select
                                    labelId={`demo-simple-select-label-${Payables_Z_Payable}`}
                                    id={`demo-simple-select-${Payables_Z_Payable}`}
                                    value="%"
                                    name="name"
                                >
                                    <MenuItem value="%">
                                        %
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <SelectControl
                        onControlValuesChange={handleSelectControlValuesChange}
                        caption={"Add More Payables"}
                    />
                </div>
            </div>

            <Box position="relative" height="100%">
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

export default withFormFieldsState(Payables as React.ComponentType<Omit<PayablesProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);