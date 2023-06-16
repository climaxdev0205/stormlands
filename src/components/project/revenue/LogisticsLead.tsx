import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, Button, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface LogisticsLeadProps extends WithFormFieldsStateProps {
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
const LogisticsLead: React.FC<LogisticsLeadProps> = ({
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
    const [Logistics_L_Logistics, setLogistics_L_Logistics] = useState<string>('London Metal Exchange');

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Logistics_L_Logistics') {
                    setLogistics_L_Logistics(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["Logistics_L_Logistics"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        console.log('handleInputChange', key, value);
        if (key === 'setLogistics_L_Logistics') {
            setLogistics_L_Logistics(value);
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
                <Grid item xs={6} md={6}>
                    <FormControl
                        sx={{minWidth: 60, maxWidth: 500}}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-sm pb-2">Logistics (USD/WMT)</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="name"
                            autoComplete="off"
                            value={Logistics_L_Logistics}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("Logistics_L_Logistics", value);
                            }}
                            // error={validated && !mineResourcesValue}
                            error={validated && !Logistics_L_Logistics}
                            helperText={
                                validated &&
                                    (!Logistics_L_Logistics || parseFloat(Logistics_L_Logistics) <= 0)
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

export default withFormFieldsState(LogisticsLead as React.ComponentType<Omit<LogisticsLeadProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);