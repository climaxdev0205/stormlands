import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface MiningAndMillingProps extends WithFormFieldsStateProps {
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
const MiningAndMilling: React.FC<MiningAndMillingProps> = ({
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
    const [MM_DaysYear, setMM_DaysYear] = useState<string | null>(null);
    const [MM_DailyProduction, setMM_DailyProduction] = useState<string | null>(null);
    const [MM_RampUp, setMM_RampUp] = useState<string | null>(null);
    const [MM_Year1, setMM_Year1] = useState<string | null>(null);
    const [MM_Year2, setMM_Year2] = useState<string | null>(null);
    const [MM_Year3, setMM_Year3] = useState<string | null>(null);
    const [MM_MineDilution, setMM_MineDilution] = useState<string | null>(null);
    const [MM_MineRecovery, setMM_MineRecovery] = useState<string | null>(null);
    const [MM_MillRecovery, setMM_MillRecovery] = useState<string | null>(null);
    const [isRampUp, setIsRampUp] = useState<boolean>(false);

    useMemo(() => {
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'MM_DaysYear') {
                    setMM_DaysYear(fieldState.value);
                }
                if (fieldState.key === 'MM_DailyProduction') {
                    setMM_DailyProduction(fieldState.value);
                }
                if (fieldState.key === 'MM_RampUp') {
                    setMM_RampUp(fieldState.value);
                }
                if (fieldState.key === 'MM_Year1') {
                    setMM_Year1(fieldState.value);
                }
                if (fieldState.key === 'MM_Year2') {
                    setMM_Year2(fieldState.value);
                }
                if (fieldState.key === 'MM_Year3') {
                    setMM_Year3(fieldState.value);
                }
                if (fieldState.key === 'MM_MineDilution') {
                    setMM_MineDilution(fieldState.value);
                }
                if (fieldState.key === 'MM_MineRecovery') {
                    setMM_MineRecovery(fieldState.value);
                }
                if (fieldState.key === 'MM_MillRecovery') {
                    setMM_MillRecovery(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    useEffect(() => {
        if (MM_RampUp === 'true') {
            setIsRampUp(true);
        } else {
            setIsRampUp(false);
        }
    }, [MM_RampUp]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };

    const requiredFields = ["MM_DaysYear", "MM_DailyProduction"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'MM_DaysYear') {
            setMM_DaysYear(value);
        }
        if (key === 'MM_DailyProduction') {
            setMM_DailyProduction(value);
        }
        if (key === 'MM_RampUp') {
            setMM_RampUp(value);
        }
        if (key === 'MM_Year1') {
            setMM_Year1(value);
        }
        if (key === 'MM_Year2') {
            setMM_Year2(value);
        }
        if (key === 'MM_Year3') {
            setMM_Year3(value);
        }
        if (key === 'MM_MineDilution') {
            setMM_MineDilution(value);
        }
        if (key === 'MM_MineRecovery') {
            setMM_MineRecovery(value);
        }
        if (key === 'MM_MillRecovery') {
            setMM_MillRecovery(value);
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

    let gridBreakpoints = {
        xs: 8,
        lg: 4,
        xl: 3
    }

    return (
        <div className="flex flex-col p-6 mt-5 grow">
            {/* FIRST GROUP */}
            <Grid container spacing={2} justifyContent={{ xs: "flex-start", md: "flex-start" }} sx={{ maxWidth: 700 }}>
                <Grid item xs={3}>
                    <h6 className="text-sm pb-2">Days / Year</h6>
                    <TextField
                        size={"small"}
                        autoComplete="off"
                        name="name"
                        value={MM_DaysYear}
                        onChange={(e) => { handleInputChange('MM_DaysYear', e.target.value) }}
                        error={validated && !MM_DaysYear}
                        helperText={
                            validated &&
                                (!MM_DaysYear || parseFloat(MM_DaysYear) <= 0)
                                ? "Required and must be greater than 0"
                                : ""
                        } 
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={7}>
                    <h6 className="text-sm pb-2">Daily Production (MT)</h6>
                    <TextField
                        size={"small"}
                        name="name"
                        autoComplete="off"
                        value={MM_DailyProduction}
                        onChange={(e) => { handleInputChange('MM_DailyProduction', e.target.value) }}
                        error={validated && !MM_DailyProduction}
                        helperText={
                            validated &&
                                (!MM_DailyProduction || parseFloat(MM_DailyProduction) <= 0)
                                ? "Required and must be greater than 0"
                                : ""
                        } 
                        type={"number"}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <h6 className="text-sm pb-2">Ramp Up</h6>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={MM_RampUp}
                            onChange={(e) => { handleInputChange('MM_RampUp', e.target.value) }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value={true}
                                control={<Radio />}
                                label="Yes"
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

            <div className="flex grow flex-col items-start h-full mt-5">
                <div className="w-3/4 ">
                    {/* FIRST GROUP */}
                    {isRampUp &&
                        <Grid container spacing={2}>
                            <Grid item {...gridBreakpoints}>
                                <FormControl fullWidth size="small">
                                    <h6 className="text-sm pb-2">Year 1 (%)</h6>
                                    <TextField
                                        size={"small"}
                                        name="name"
                                        autoComplete="off"
                                        value={MM_Year1}
                                        onChange={(e) => { handleInputChange('MM_Year1', e.target.value) }}
                                        type={"number"}
                                        inputProps={{
                                            inputMode: "numeric",
                                            min: "0",
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item {...gridBreakpoints}>
                                <FormControl fullWidth size="small">
                                    <h6 className="text-sm pb-2">Year 2 (%)</h6>
                                    <TextField
                                        size={"small"}
                                        autoComplete="off"
                                        name="name"
                                        value={MM_Year2}
                                        onChange={(e) => { handleInputChange('MM_Year2', e.target.value) }}
                                        type={"number"}
                                        inputProps={{
                                            inputMode: "numeric",
                                            min: "0",
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item {...gridBreakpoints}>
                                <FormControl fullWidth size="small">
                                    <h6 className="text-sm pb-2">Year 3 (%)</h6>
                                    <TextField
                                        autoComplete='off'
                                        size={"small"}
                                        name="name"
                                        value={MM_Year3}
                                        onChange={(e) => { handleInputChange('MM_Year3', e.target.value) }}
                                        type={"number"}
                                        inputProps={{
                                            inputMode: "numeric",
                                            min: "0",
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    }
                </div>
            </div>


            <h3 className="my-5 mt-8">Mine Operations</h3>

            <Grid container spacing={2} justifyContent={{ xs: "flex-start", md: "flex-start" }} sx={{ maxWidth: 700 }}>
                <Grid item xs={3}>
                    <h6 className="text-sm pb-2">Mine Dilution (%)</h6>
                    <TextField
                        size={"small"}
                        name="name"
                        autoComplete="off"
                        value={MM_MineDilution}
                        onChange={(e) => { handleInputChange('MM_MineDilution', e.target.value) }}
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <h6 className="text-sm pb-2">Mine Recovery (%)</h6>
                    <TextField
                        size={"small"}
                        autoComplete="off"
                        name="name"
                        value={MM_MineRecovery}
                        onChange={(e) => { handleInputChange('MM_MineRecovery', e.target.value) }}
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                        }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <h6 className="text-sm pb-2">Mill Recovery (%)</h6>
                    <TextField
                        size={"small"}
                        autoComplete="off"
                        name="name"
                        value={MM_MillRecovery}
                        onChange={(e) => { handleInputChange('MM_MillRecovery', e.target.value) }}
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                        }}
                    />
                </Grid>
            </Grid>

            <Box position="relative" height="100%" sx={{ marginTop: "36px" }} >
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

export default withFormFieldsState(MiningAndMilling as React.ComponentType<Omit<MiningAndMillingProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);