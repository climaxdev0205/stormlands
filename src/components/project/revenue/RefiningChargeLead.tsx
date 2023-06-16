import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import SelectControl from '@components/selects/SelectControl';

interface RefiningChargeLeadProps extends WithFormFieldsStateProps {
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
const RefiningChargeLead: React.FC<RefiningChargeLeadProps> = ({
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
    const [RC_L_Charge, setRC_L_Charge] = useState<string | null>(null);
    const [RC_L_Value, setRC_L_Value] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'RC_L_Charge') {
                    setRC_L_Charge(fieldState.value);
                }
                if (fieldState.key === 'RC_L_Value') {
                    setRC_L_Value(fieldState.value);
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
    const handleSelectControlValuesChange = (values: any[]) => {
        console.log('handleSelectControlValuesChange', values);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'RC_L_Charge') {
            setRC_L_Charge(value);
        }
        if (key === 'RC_L_Value') {
            setRC_L_Value(value);
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
                <Grid item xs={3} md={3}>
                    <FormControl
                        sx={{ minWidth: 60, maxWidth: 500 }}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-sm pb-2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Charge (USD)</h6>
                        <Select
                            labelId={`demo-simple-select-label-${RC_L_Charge}`}
                            id={`demo-simple-select-${RC_L_Charge}`}
                            value="1.50"
                            onChange={(e) => handleInputChange('RC_L_Charge', e.target.value as string)}
                            name="name"
                            disabled={true}
                        >
                            <MenuItem value="1.50">
                                1.50
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
                        <h6 className="text-sm pb-2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>Value</h6>
                        <Select
                            labelId={`demo-simple-select-label-${RC_L_Value}`}
                            id={`demo-simple-select-${RC_L_Value}`}
                            value="T.oz"
                            onChange={(e) => handleInputChange('RC_L_Value', e.target.value as string)}
                            name="name"
                            disabled={true}
                        >
                            <MenuItem value="T.oz">
                                T.oz
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

export default withFormFieldsState(RefiningChargeLead as React.ComponentType<Omit<RefiningChargeLeadProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);