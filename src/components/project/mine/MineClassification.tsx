import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, FormHelperText, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import MineResourceInput from '@components/inputs/MineResourceInput';
import SelectControl from '@components/selects/SelectControl';
interface MineClassificationProps extends WithFormFieldsStateProps {
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
const MineClassification: React.FC<MineClassificationProps> = ({
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
    const [MC_MineResources, setMC_MineResources] = useState<string>('');
    const [MC_MineralReserves, setMC_MineralReserves] = useState<string>('');

    useMemo(() => {
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'MC_MineResources') {
                    setMC_MineResources(fieldState.value);
                }
                if (fieldState.key === 'MC_MineralReserves') {
                    setMC_MineralReserves(fieldState.value);
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
        console.log('handleInputChange', key, value);
        if (key === 'MC_MineResources') {
            setMC_MineResources(value);
        }
        if (key === 'MC_MineralReserves') {
            setMC_MineralReserves(value);
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
        <div>
            <div className="flex flex-col items-start p-6 h-full grow">
                <div className="flex justify-start  mt-5">
                    <Stack spacing={2} direction="column" alignItems="flex-start">
                        <Grid container spacing={20}>
                            <Grid item xs={4}>
                                <FormControl>
                                    <h6 className="text-sm pb-2">Mineral Resources</h6>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        value={MC_MineResources}
                                        onChange={(e) => handleInputChange('MC_MineResources', e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="Inferred"
                                            control={<Radio />}
                                            label="Inferred"
                                        />
                                        <FormControlLabel
                                            value="Indicated"
                                            control={<Radio />}
                                            label="Indicated"
                                        />
                                        <FormControlLabel
                                            value="Measured"
                                            control={<Radio />}
                                            label="Measured"
                                        />
                                    </RadioGroup>
                                    {validated && !MC_MineResources && (
                                        <FormHelperText sx={{ color: 'error.main' }}>Please select a resource category</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl>
                                    <h6 className="text-sm pb-2">Mineral Reserves</h6>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group2"
                                        value={MC_MineralReserves}
                                        onChange={(e) => handleInputChange('MC_MineralReserves', e.target.value)}
                                    >
                                        <FormControlLabel
                                            value="Probable"
                                            control={<Radio />}
                                            label="Probable"
                                        />
                                        <FormControlLabel
                                            value="Proven"
                                            control={<Radio />}
                                            label="Proven"
                                        />
                                    </RadioGroup>
                                    {validated && !MC_MineralReserves && (
                                        <FormHelperText sx={{ color: 'error.main' }}>Please select a mineral category</FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Stack>
                </div>
            </div>

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

export default withFormFieldsState(MineClassification as React.ComponentType<Omit<MineClassificationProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);