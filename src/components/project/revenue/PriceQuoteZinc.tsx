import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, Typography, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import MineResourceInput from '@components/inputs/MineResourceInput';
import SelectControl from '@components/selects/SelectControl';
interface PriceQuoteZincProps extends WithFormFieldsStateProps {
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
const PriceQuoteZinc: React.FC<PriceQuoteZincProps> = ({
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
    const [PriceQuote_Z_PriceQuote, setPriceQuote_Z_PriceQuote] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'PriceQuote_Z_PriceQuote') {
                    setPriceQuote_Z_PriceQuote(fieldState.value);
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
        if (key === 'PriceQuote_Z_PriceQuote') {
            setPriceQuote_Z_PriceQuote(value);
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
            <h6 className="text-sm pb-2 text-center">You Have Selected Fixed Price, Please Click Next</h6>
            <Grid container spacing={2} xs={8}>
                <Grid item xs={4}>
                    <FormControl>
                        <h6 className="text-sm pb-2">Please Select</h6>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={PriceQuote_Z_PriceQuote}
                            onChange={(e) => handleInputChange('PriceQuote_Z_PriceQuote', e.target.value)}
                        >
                            <FormControlLabel
                                value="Cash Bid"
                                control={<Radio />}
                                label="Cash Bid"
                                disabled={true}
                            />
                            <FormControlLabel
                                value="Cash Offer"
                                control={<Radio />}
                                label="Cash Offer"
                                disabled={true}
                            />
                            <FormControlLabel
                                value="3 Month Bid"
                                control={<Radio />}
                                label="3 Month Bid"
                                disabled={true}
                            />
                            <FormControlLabel
                                value="3 Month Offer"
                                control={<Radio />}
                                label="3 Month Offer"
                                disabled={true}
                            />
                            <FormControlLabel
                                value="Average All"
                                control={<Radio />}
                                label="Average All"
                                disabled={true}
                            />
                        </RadioGroup>
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

export default withFormFieldsState(PriceQuoteZinc as React.ComponentType<Omit<PriceQuoteZincProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);