import React, { useMemo, useState } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, Stack, Typography, TextField, Switch } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import logo from 'public/assets/stormlands-icon-rgb.png'
import Image from 'next/image';

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
    const [checked, setChecked] = useState<boolean>(true);

    //Values for field states


    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                //fields
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

    const switchHandler = () => {
        setChecked(!checked);
    };

    const handleInputChange = (key: string, value: string) => {
        console.log('handleInputChange', key, value);

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
            <div className="flex grow flex-col items-start h-full mt-5 p-6">
                <div style={{width: "100%"}}>
                    {/* <FormControlLabel control={<Switch checked={checked} color="success" onChange={switchHandler}/>}
                        label={checked ? "On" : "Off"}
                        labelPlacement="start"
                        style={{float:"right", marginTop: -50}}
                    /> */}
                    <Grid container spacing={2} sx={{ marginBottom: 4, height: 275 }}>
                        <Grid item xs={12}>
                        <h6 className="text-sm pb-2 text-center">You Have Selected Fixed Price, Please Click Next</h6>
                            <Box display="block" style={{ height: 275}}
                            >
                                <Box style={{width: "100%"}} justifyContent="center" alignItems="center" display="flex">
                                    <Image alt="contact" src={logo}/>
                                </Box>
                                <Box style={{width: "100%", position:"relative", bottom: 275, height: 275}} justifyContent="center" alignItems="center" display="flex">
                                    <Typography variant="h6" gutterBottom component="div" textAlign="center">
                                        For more details please contact Stormlands
                                        <br/>
                                        <a href='mailto:support@stormlands.com' style={{color: "blue", fontSize: 18}}>support@stormlands.com</a>
                                    </Typography>
                                </Box>
                            </Box>                        </Grid>
                    </Grid>
                </div>
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

export default withFormFieldsState(TreatmentChargeLead as React.ComponentType<Omit<TreatmentChargeLeadProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);