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

interface WorkingCapitalProps extends WithFormFieldsStateProps {
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

const WorkingCapital: React.FC<WorkingCapitalProps> = ({
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
    //Values for field states
    const [WC_WorkingCapital, setWC_WorkingCapital] = useState<string | null>(null);
    const [WC_Capex, setWC_Capex] = useState<string | null>(null);
    const [WC_TOC, setWC_TOC] = useState<string | null>(null);
    const [WC_Fixed, setWC_Fixed] = useState<string | null>(null);

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'WC_WorkingCapital') {
                    setWC_WorkingCapital(fieldState.value);
                }
                if (fieldState.key === 'WC_Capex') {
                    setWC_Capex(fieldState.value);
                }
                if (fieldState.key === 'WC_TOC') {
                    setWC_TOC(fieldState.value);
                }
                if (fieldState.key === 'WC_Fixed') {
                    setWC_Fixed(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    
    const handleValidate = () => {
        const capexValid = WC_Capex && parseFloat(WC_Capex) > 0;
        const tocValid = WC_TOC && parseFloat(WC_TOC) > 0;
        const fixedValid = WC_Fixed && parseFloat(WC_Fixed) > 0;
    
        const valid = capexValid || tocValid || fixedValid;
        setValidated(!valid);
        return !!valid; // Ensure a boolean value is returned
    };    

    const handleInputChange = (key: string, value: string) => {
        if (key === 'WC_WorkingCapital') {
            setWC_WorkingCapital(value);
            if (value == 'Total Capex') {
                handleInputChange('WC_TOC', '0');
                handleInputChange('WC_Fixed', '');
            }
            else if (value == 'Total Operating') {
                handleInputChange('WC_Capex', '0');
                handleInputChange('WC_Fixed', '');
            }
            else if (value == 'Fixed Amount') {
                handleInputChange('WC_TOC', '0');
                handleInputChange('WC_Fixed', '');
            }
        }
        if (key === 'WC_Capex') {
            setWC_Capex(value);
        }
        if (key === 'WC_TOC') {
            setWC_TOC(value);
        }
        if (key === 'WC_Fixed') {
            setWC_Fixed(value);
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
                            value={WC_WorkingCapital}
                            onChange={(e) => {
                                handleInputChange('WC_WorkingCapital', e.target.value)
                            }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="Total Capex"
                                control={<Radio />}
                                label="Total Capex (%)"
                            />
                            {WC_WorkingCapital === "Total Capex" && (
                                <Grid item sx={{ marginBottom: 1 }}>
                                    <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="WC_Capex"
                                        autoComplete="off"
                                        value={WC_Capex}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("WC_Capex", value);
                                        }}
                                        error={validated && !WC_Capex}
                                        helperText={
                                            validated &&
                                                (!WC_Capex || parseFloat(WC_Capex) <= 0)
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
                                </Grid>
                            )}
                            <FormControlLabel
                                value="Total Operating"
                                control={<Radio />}
                                label="Total Operating (%)"
                            />
                            {WC_WorkingCapital === "Total Operating" && (
                                <Grid item sx={{ marginBottom: 1 }}>
                                    <h6 className="text-sm pb-2">Total Operating (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="WC_TOC"
                                        autoComplete="off"
                                        value={WC_TOC}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("WC_TOC", value);
                                        }}
                                        error={validated && !WC_TOC}
                                        helperText={
                                            validated &&
                                                (!WC_TOC || parseFloat(WC_TOC) <= 0)
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
                                </Grid>
                            )}
                            <FormControlLabel
                                value="Fixed Amount"
                                control={<Radio />}
                                label="Fixed Amount (USD)"
                            />
                            {WC_WorkingCapital === "Fixed Amount" && (
                                <Grid item sx={{ marginBottom: 1 }}>
                                    <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="WC_Fixed"
                                        autoComplete="off"
                                        value={WC_Fixed}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("WC_Fixed", value);
                                        }}
                                        error={validated && !WC_Fixed}
                                        helperText={
                                            validated &&
                                                (!WC_Fixed || parseFloat(WC_Fixed) <= 0)
                                                ? "Required and must be greater than 0"
                                                : ""
                                        }
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                        required
                                    />
                                </Grid>
                            )}
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

export default withFormFieldsState(WorkingCapital as React.ComponentType<Omit<WorkingCapitalProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);
