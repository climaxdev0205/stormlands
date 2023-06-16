import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from "@mui/material/FormControl";
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import { FormField } from "src/API";
import NavigationButtons from "@components/project/NavigationButtons";
import { Radio, RadioGroup } from "@mui/material";
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface EnvironmentalProductionProps extends WithFormFieldsStateProps {
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

const EnvironmentalProduction: React.FC<EnvironmentalProductionProps> = ({
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
    subStepId
}) => {
    const [validated, setValidated] = useState(false);
    const [valueOperating, setValueOperating] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [valueCapex, setValueCapex] = React.useState<object>({ marginBottom: 1, display: "none" });
    const [valueFixed, setValueFixed] = React.useState<object>({ marginBottom: 1, display: "none" });

    //Values for field states
    const [E_Production, setE_Production] = useState<string | null>(null);
    const [E_Production_Capex, setE_Production_Capex] = useState<string | null>(null);
    const [E_Production_Fixed, setE_Production_Fixed] = useState<string | null>(null);
    const [E_ProductionValue, setE_ProductionValue] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'E_Production') {
                    setE_Production(fieldState.value);
                    if (fieldState.value === "Total Operating Costs") {
                        setValueOperating({ marginBottom: 1, display: "block" })
                        setValueCapex({ marginBottom: 1, display: "none" })
                        setValueFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Total Capex") {
                        setValueCapex({ marginBottom: 1, display: "block" })
                        setValueOperating({ marginBottom: 1, display: "none" })
                        setValueFixed({ marginBottom: 1, display: "none" })
                    }
                    if (fieldState.value === "Fixed Amount") {
                        setValueFixed({ marginBottom: 1, display: "block" })
                        setValueOperating({ marginBottom: 1, display: "none" })
                        setValueCapex({ marginBottom: 1, display: "none" })
                    }
                }
                if (fieldState.key === 'E_ProductionValue') {
                    setE_ProductionValue(fieldState.value);
                }
                if(fieldState.key === 'E_Production_Capex'){
                    setE_Production_Capex(fieldState.value);
                }
                if(fieldState.key === 'E_Production_Fixed'){
                    setE_Production_Fixed(fieldState.value);
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
        if (key === 'E_Production') {
            setE_Production(value);
            if (value == 'Total Operating Costs') {
                handleInputChange('E_Production_Capex', '0');
                handleInputChange('E_Production_Fixed', '');
            }
            else if (value == 'Total Capex') {
                handleInputChange('E_ProductionValue', '0');
                handleInputChange('E_Production_Fixed', '');

            }
            else if (value == 'Fixed Amount') {
                handleInputChange('E_Production_Capex', '0');
                handleInputChange('E_ProductionValue', '0');
            }
        }
        if (key === 'E_ProductionValue') {
            setE_ProductionValue(value);
        }
        if (key === 'E_Production_Capex') {
            setE_Production_Capex(value);
        }
        if (key === 'E_Production_Fixed') {
            setE_Production_Fixed(value);
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
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <FormControl>
                        <h6 className="text-sm pb-2">Please Select</h6>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={E_Production}
                            onChange={(e) => {
                                handleInputChange('E_Production', e.target.value)
                            }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="Total Operating Costs"
                                control={<Radio />}
                                label="Total Operating Costs"
                            />
                            <Grid item sx={valueOperating}>
                                <h6 className="text-sm pb-2">Total Operating Costs (%)</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="E_ProductionValue"
                                    autoComplete="off"
                                    value={E_ProductionValue}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleInputChange("E_ProductionValue", value);
                                    }}
                                    type={"number"}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <FormControlLabel
                                value="Total Capex"
                                control={<Radio />}
                                label="Total Capex"
                            />
                            <Grid item sx={valueCapex}>
                                <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="E_Production_Capex"
                                    autoComplete="off"
                                    value={E_Production_Capex}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleInputChange("E_Production_Capex", value);
                                    }}
                                    type={"number"}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
                            <FormControlLabel
                                value="Fixed Amount"
                                control={<Radio />}
                                label="Fixed Amount"
                            />
                            <Grid item sx={valueFixed}>
                                <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                <TextField
                                    className="w-full"
                                    size={"small"}
                                    name="E_Production_Fixed"
                                    autoComplete="off"
                                    value={E_Production_Fixed}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        handleInputChange("E_Production_Fixed", value);
                                    }}
                                    type={"number"}
                                    InputProps={{
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            </Grid>
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
                    }}
                />
            </Box>
        </div>
    );
};

export default withFormFieldsState(EnvironmentalProduction as React.ComponentType<Omit<EnvironmentalProductionProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);
