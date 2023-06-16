import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface TreatmentChargeLeadProps extends WithFormFieldsStateProps {
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
const TreatmentChargeLead: React.FC<TreatmentChargeLeadProps> = ({
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
    const [TC_L_TotalTreatmentCharge, setTC_L_TotalTreatmentCharge] = useState<string | null>(null);
    const [TC_L_PriceParticipation, setTC_L_PriceParticipation] = useState<string | null>(null);
    const [TC_L_BasisPrice, setTC_L_BasisPrice] = useState<string | null>(null);
    const [TC_L_Down, setTC_L_Down] = useState<string | null>(null);
    const [TC_L_Up, setTC_L_Up] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'TC_L_TotalTreatmentCharge') {
                    setTC_L_TotalTreatmentCharge(fieldState.value);
                }
                if (fieldState.key === 'TC_L_PriceParticipation') {
                    setTC_L_PriceParticipation(fieldState.value);
                }
                if (fieldState.key === 'TC_L_BasisPrice') {
                    setTC_L_BasisPrice(fieldState.value);
                }
                if (fieldState.key === 'TC_L_Down') {
                    setTC_L_Down(fieldState.value);
                }
                if (fieldState.key === 'TC_L_Up') {
                    setTC_L_Up(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["TC_L_TotalTreatmentCharge"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        console.log('handleInputChange', key, value);
        if (key === 'TC_L_TotalTreatmentCharge') {
            setTC_L_TotalTreatmentCharge(value);
        }
        if (key === 'TC_L_PriceParticipation') {
            setTC_L_PriceParticipation(value);
        }
        if (key === 'TC_L_BasisPrice') {
            setTC_L_BasisPrice(value);
        }
        if (key === 'TC_L_Down') {
            setTC_L_Down(value);
        }
        if (key === 'TC_L_Up') {
            setTC_L_Up(value);
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

    return (
        <div className="flex flex-col p-6 mt-5 grow">
            <Grid container spacing={2} xs={8}>
                <Grid item xs={4} md={4}>
                    <FormControl
                        sx={{ minWidth: 60, maxWidth: 500 }}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-sm pb-2">Value</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="name"
                            autoComplete="off"
                            value={TC_L_TotalTreatmentCharge}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("TC_L_TotalTreatmentCharge", value);
                            }}
                            error={validated && !TC_L_TotalTreatmentCharge}
                            helperText={
                                validated &&
                                    (!TC_L_TotalTreatmentCharge || parseFloat(TC_L_TotalTreatmentCharge) <= 0)
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
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} xs={8} sx={{marginTop: 1}}>
                <Grid item xs={4} md={4}>
                    <FormControl>
                    <h6 className="text-sm pb-2">Price Participation</h6>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // value={TC_L_PriceParticipation}
                        value={false}
                        onChange={(e) => { handleInputChange('TC_L_PriceParticipation', e.target.value) }}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Yes"
                            disabled={true}
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="No"
                        />
                    </RadioGroup>
                </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} xs={8} sx={{marginTop: 1}}>
                <Grid item xs={4} md={4}>
                <FormControl
                        sx={{ minWidth: 60, maxWidth: 500 }}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-sm pb-2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Basis Price (USD)</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="name"
                            autoComplete="off"
                            value={TC_L_BasisPrice}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("TC_L_BasisPrice", value);
                            }}
                            type={"number"}
                            InputProps={{
                                inputProps: { min: 0 },
                                readOnly: true,
                                style: {
                                    backgroundColor: 'rgba(229, 231, 235, 0.38)', // Set background color for the input
                                    borderRadius: 4, // Add border radius to the input
                                  },
                            }}
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={2} xs={8} sx={{marginTop: 1}}>
                <Grid item xs={3} md={3}>
                    <FormControl
                        sx={{ minWidth: 60, maxWidth: 500 }}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-sm pb-2">Down (%)</h6>
                        <Select
                            labelId={`demo-simple-select-label-${TC_L_Down}`}
                            id={`demo-simple-select-${TC_L_Down}`}
                            value={"10"}
                            name="name"
                            disabled={true}
                        >
                            <MenuItem value="10">
                                10
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
                        <h6 className="text-sm pb-2">Up (%)</h6>
                        <Select
                            labelId={`demo-simple-select-label-${TC_L_Up}`}
                            id={`demo-simple-select-${TC_L_Up}`}
                            value="10"
                            name="name"
                            disabled={true}
                        >
                            <MenuItem value="10">
                                10
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

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
                    }
                    }
                />
            </Box>
        </div>
    );
};

export default withFormFieldsState(TreatmentChargeLead as React.ComponentType<Omit<TreatmentChargeLeadProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);