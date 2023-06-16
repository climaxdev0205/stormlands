import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';

interface TaxAndRoyaltyProps extends WithFormFieldsStateProps {
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
const TaxAndRoyalty: React.FC<TaxAndRoyaltyProps> = ({
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
    const [Tax_RoyaltyRate, setTax_RoyaltyRate] = useState<string | null>(null);
    const [Tax_TaxRate, setTax_TaxRate] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Tax_RoyaltyRate') {
                    setTax_RoyaltyRate(fieldState.value);
                }
                if (fieldState.key === 'Tax_TaxRate') {
                    setTax_TaxRate(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["Tax_RoyaltyRate", "Tax_TaxRate"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'Tax_RoyaltyRate') {
            setTax_RoyaltyRate(value);
        }
        if (key === 'Tax_TaxRate') {
            setTax_TaxRate(value);
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

            <div className="flex flex-col p-6 mt-5 grow">

            <Box sx={{}} className="mt-3">
                    <h6 className="text-sm pb-2">Royalty Rate (%)</h6>
                    <TextField
                        size={"small"}
                        autoComplete="off"
                        // label={"Total Operation Costs (%)"}
                        name="name"
                        value={Tax_RoyaltyRate}
                        onChange={(e) => handleInputChange('Tax_RoyaltyRate', e.target.value)}
                        error={validated && !Tax_RoyaltyRate}
                        helperText={
                            validated &&
                                (!Tax_RoyaltyRate || parseFloat(Tax_RoyaltyRate) <= 0)
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

                <Box sx={{}} className="mb-10 mt-3">
                    <h6 className="text-sm pb-2">Tax Rate (%)</h6>
                    <TextField
                        size={"small"}
                        autoComplete="off"
                        // label={"Total Operation Costs (%)"}
                        name="name"
                        value={Tax_TaxRate}
                        onChange={(e) => handleInputChange('Tax_TaxRate', e.target.value)}
                        error={validated && !Tax_TaxRate}
                        helperText={
                            validated &&
                                (!Tax_TaxRate || parseFloat(Tax_TaxRate) <= 0)
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

export default withFormFieldsState(TaxAndRoyalty as React.ComponentType<Omit<TaxAndRoyaltyProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);