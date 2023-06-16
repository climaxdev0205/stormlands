import React, { useEffect, useMemo, useState } from 'react';
import { FormField, GetVersionQuery } from 'src/API';
import { Box, TextField, Grid, Typography, Button } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import { useRouter } from 'next/router';

interface FinancialRatesProps extends WithFormFieldsStateProps {
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

interface StepData {
    label: string;
    isCompleted: boolean;
    sortOrder: number;
    subSteps: {
        id: string;
        label: string;
        sortOrder: number;
        isCompleted: boolean;
    }[];
}

const FinancialRates: React.FC<FinancialRatesProps> = ({
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
    const [completed, setCompleted] = useState(false);

    //Values for field states
    const [FR_Inflation, setFR_Inflation] = useState<string | null>(null);
    const [FR_DiscountRate, setFR_DiscountRate] = useState<string | null>(null);

    const router = useRouter();

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'FR_Inflation') {
                    setFR_Inflation(fieldState.value);
                }
                if (fieldState.key === 'FR_DiscountRate') {
                    setFR_DiscountRate(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const isAllStepsAndSubStepsCompleted = () => {
        for (let i = 0; i <= activeStep; i++) {
            for (let j = 0; j <= activeSubStep; j++) {
                if (!isSubStepCompleted(i, j)) {
                    return false;
                }
            }
        }
        return true;
    };

    const handleSave = () => {
        if (isAllStepsAndSubStepsCompleted()) {
            setCompleted(true);
        }
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["FR_DiscountRate"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'FR_Inflation') {
            setFR_Inflation(value);
        }
        if (key === 'FR_DiscountRate') {
            setFR_DiscountRate(value);
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

    const handleSelectControlValuesChange = (values: any[]) => {
        console.log('handleSelectControlValuesChange', values);
    };

    return (
        <div>
            {
                completed ? (
                    <div className="flex flex-col p-6 mt-5 grow">
                        <Grid container spacing={3} justifyContent="center" alignItems="center">
                            <Grid item>
                                <Typography sx={{ fontSize: 30, marginBottom: 5 }}>
                                    Project has been completed!
                                </Typography>
                                <Button
                                    sx={{ width: 250, display: "block", marginBottom: 5, alignItems: "center", justifyContent: 'center' }}
                                    variant="contained"
                                    onClick={() => {
                                        router.push('/analysis');
                                    }}
                                >
                                    Analyse Project
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col p-6 mt-5 grow">

                            <Box sx={{}} className="mt-3">
                            <h6 className="text-sm pb-2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Inflation (%)</h6>
                                <TextField
                                    size={"small"}
                                    autoComplete="off"
                                    name="name"
                                    value={FR_Inflation}
                                    onChange={(e) => handleInputChange('FR_Inflation', e.target.value)}
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
                            </Box>

                            <Box sx={{}} className="mb-10 mt-6">
                            <h6 className="text-sm pb-2">Applicable Discount Rate (%)</h6>
                                <TextField
                                    size={"small"}
                                    autoComplete="off"

                                    name="name"
                                    value={FR_DiscountRate}
                                    onChange={(e) => handleInputChange('FR_DiscountRate', e.target.value)}
                                    error={validated && !FR_DiscountRate}
                                    helperText={
                                        validated &&
                                            (!FR_DiscountRate || parseFloat(FR_DiscountRate) <= 0)
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
                            </Box>

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
                    </>
                )
            }

        </div>
    );
};

export default withFormFieldsState(FinancialRates as React.ComponentType<Omit<FinancialRatesProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);