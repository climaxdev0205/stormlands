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

interface OverheadsProps extends WithFormFieldsStateProps {
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

const Overheads: React.FC<OverheadsProps> = ({
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
    const [Over_Overheads, setOver_Overheads] = useState<string | null>(null);
    const [Over_Overheads_Percentage, setOver_Overheads_Percentage] = useState<string | null>(null);
    const [Over_Overheads_Amount, setOver_Overheads_Amount] = useState<string | null>(null);

    useMemo(() => {
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Over_Overheads') {
                    setOver_Overheads(fieldState.value);
                }
                if (fieldState.key === 'Over_Overheads_Percentage') {
                    setOver_Overheads_Percentage(fieldState.value);
                }
                if (fieldState.key === 'Over_Overheads_Amount') {
                    setOver_Overheads_Amount(fieldState.value);
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
        let tIndex = -1;
        if (key === 'Over_Overheads') {
            setOver_Overheads(value);
            if (value == 'Total Capex') {
                handleInputChange('Over_Overheads_Amount', '');
            }
            else if(value = 'Fixed Amount') {
                handleInputChange('Over_Overheads_Percentage', '');
            }
        }
        if (key === 'Over_Overheads_Percentage') {
            setOver_Overheads_Percentage(value);
        }
        if (key === 'Over_Overheads_Amount') {
            setOver_Overheads_Amount(value);
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
                <Grid item xs={12}>
                    <FormControl>
                        <h6 className="text-sm pb-2">Subject</h6>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            value={Over_Overheads}
                            onChange={(e) => {
                                handleInputChange('Over_Overheads', e.target.value)
                            }}
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="Total Capex"
                                control={<Radio />}
                                label="Total Capex"
                            />
                            {Over_Overheads === "Total Capex" && (
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="Over_Overheads_Amount"
                                            autoComplete="off"
                                            value={Over_Overheads_Percentage}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                handleInputChange("Over_Overheads_Percentage", value);
                                            }}
                                            error={validated && !Over_Overheads_Percentage}
                                            helperText={
                                                validated &&
                                                    (!Over_Overheads_Percentage || parseFloat(Over_Overheads_Percentage) <= 0)
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
                                </Grid>
                            )}
                            <FormControlLabel
                                value="Fixed Amount"
                                control={<Radio />}
                                label="Fixed Amount"
                            />
                            {Over_Overheads === "Fixed Amount" && (
                                <Grid container spacing={2}>
                                    <Grid item xs={10}>
                                        <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="Over_Overheads_Amount"
                                            autoComplete="off"
                                            value={Over_Overheads_Amount}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                handleInputChange("Over_Overheads_Amount", value);
                                            }}
                                            error={validated && !Over_Overheads_Amount}
                                            helperText={
                                                validated &&
                                                    (!Over_Overheads_Amount || parseFloat(Over_Overheads_Amount) <= 0)
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
                                    </Grid>
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

export default withFormFieldsState(Overheads as React.ComponentType<Omit<OverheadsProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);
