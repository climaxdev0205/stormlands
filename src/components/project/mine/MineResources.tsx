import React, {useMemo, useState} from 'react';
import {FormField} from 'src/API';
import {Box} from '@mui/material';
import withFormFieldsState, {WithFormFieldsStateProps} from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import MineResourceInput from '@components/inputs/MineResourceInput';
import OreGradeControlStatic from '@components/selects/OreGradeControlStatic';
import Grid from "@mui/material/Grid";

interface MineResourcesProps extends WithFormFieldsStateProps {
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

const MineResources: React.FC<MineResourcesProps> = ({
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
    const [MR_ZincResources, setMR_ZincResources] = useState<string | null>(null);
    const [MR_LeadResources, setMR_LeadResources] = useState<string | null>(null);
    const [MR_SilverResources, setMR_SilverResources] = useState<string | null>(null);
    const [MR_GoldResources, setMR_GoldResources] = useState<string | null>(null);
    const [mineResourcesValue, setMineResourcesValue] = useState<string | null>(null);
    const [specificGravityValue, setSpecificGravityValue] = useState<string | null>(null);

    useMemo(() => {
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                    if (fieldState.key === 'MR_ZincResources') {
                        setMR_ZincResources(fieldState.value);
                    }
                    if (fieldState.key === 'MR_LeadResources') {
                        setMR_LeadResources(fieldState.value);
                    }
                    if (fieldState.key === 'MR_SilverResources') {
                        setMR_SilverResources(fieldState.value);
                    }
                    if (fieldState.key === 'MR_GoldResources') {
                        setMR_GoldResources(fieldState.value);
                    }
                    if (fieldState.key === 'MR_MineResources') {
                        setMineResourcesValue(fieldState.value);
                    }
                    if (fieldState.key === 'MR_SpecificGravity') {
                        setSpecificGravityValue(fieldState.value);
                    }
                }
            );
        }
    }, [formFieldsState]);

    const requiredFields = ["MR_LeadResources", "MR_MineResources"];

    const handleValidate = () => {
        const hasLeadOrZincResource = (formFieldsState.some(field => field.key === "MR_LeadResources" && field.value) || formFieldsState.some(field => field.key === "MR_ZincResources" && field.value));
        const hasMineResource = formFieldsState.some(field => field.key === "MR_MineResources" && field.value);
        const valid = hasLeadOrZincResource && hasMineResource;
        setValidated(!valid);
        return valid;
    };

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'MR_ZincResources') {
            setMR_ZincResources(value);
        }
        if (key === 'MR_LeadResources') {
            setMR_LeadResources(value);
        }
        if (key === 'MR_SilverResources') {
            setMR_SilverResources(value);
        }
        if (key === 'MR_GoldResources') {
            setMR_GoldResources(value);
        }
        if (key === 'MR_MineResources') {
            setMineResourcesValue(value);
        }
        if (key === 'MR_SpecificGravity') {
            setSpecificGravityValue(value);
        }
        //update the formFieldsState with the new value
        const index = formFieldsState.findIndex((fieldState) => fieldState.key === key);
        //if a field with the key exists in the formFieldsState
        if (index > -1) {
            const newFormFieldsState = [...formFieldsState];
            newFormFieldsState[index].value = value;
            setFormFieldsState(newFormFieldsState);
        }
    };

    return (
        <div className="flex flex-col p-6 mt-5 grow">
            <Grid container xs={8}>
                <OreGradeControlStatic
                    validated={validated}
                    onHandleInput={handleInputChange}
                    MR_ZincResources={MR_ZincResources}
                    MR_LeadResources={MR_LeadResources}
                />
                <MineResourceInput
                    validated={validated}
                    onHandleInput={handleInputChange}
                    mineResourcesValue={mineResourcesValue}
                    specificGravityValue={specificGravityValue}
                />
            </Grid>
            <Box position="relative" height="100%" sx={{marginTop: "36px"}}>
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

export default withFormFieldsState(MineResources as React.ComponentType<Omit<MineResourcesProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);