import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import SelectControl from '@components/selects/SelectControl';

interface PriceZincProps extends WithFormFieldsStateProps {
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

const PriceZinc: React.FC<PriceZincProps> = ({
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
    const [Price_Z_Price, setPrice_Z_Price] = useState<string>("London Metal Exchange");
    const valList = ['London Metal Exchange', 'Shanghai Metal Exchange'];


    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Price_Z_Price') {
                    if (valList.indexOf(fieldState.key) >= 0) {
                        setPrice_Z_Price(fieldState.value);
                    }
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
        if (key === 'Price_Z_Price') {
            setPrice_Z_Price(value);
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
                    <Grid item xs={6} md={6}>
                        <FormControl
                            sx={{ minWidth: 60, maxWidth: 500 }}
                            fullWidth
                            size="small"
                        >
                            <h6 className="text-sm pb-2">Please Select</h6>
                            <Select
                                labelId={`demo-simple-select-label-${Price_Z_Price}`}
                                id={`demo-simple-select-${Price_Z_Price}`}
                                name="name"
                                value={Price_Z_Price}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Price_Z_Price", value);
                                    setPrice_Z_Price(value);
                                }}
                                disabled={true}
                            >
                                <MenuItem value="London Metal Exchange">
                                    London Metal Exchange
                                </MenuItem>
                                <MenuItem value="Shanghai Metal Exchange">
                                    Shanghai Metal Exchange
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
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

export default withFormFieldsState(PriceZinc as React.ComponentType<Omit<PriceZincProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);