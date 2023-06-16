import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import { FormField } from "src/API";
import NavigationButtons from "@components/project/NavigationButtons";
import { Radio, RadioGroup } from "@mui/material";
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface OperatingProps extends WithFormFieldsStateProps {
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

const Operating: React.FC<OperatingProps> = ({
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
    const [Oper_Operating, setOper_Operating] = useState<string | null>(null);

    const [Oper_TotalCapex, setOper_TotalCapex] = useState<string | null>(null);
    const [Oper_FixedAmount, setOper_FixedAmount] = useState<string | null>(null);

    const [Oper_OperatingMining, setOper_OperatingMining] = useState<string | null>(null);
    const [Oper_OperatingMilling, setOper_OperatingMilling] = useState<string | null>(null);
    const [Oper_OperatingProcessing, setOper_OperatingProcessing] = useState<string | null>(null);

    useEffect(() => {
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Oper_Operating') {
                    setOper_Operating(fieldState.value);
                }
                if (fieldState.key === 'Oper_TotalCapex') {
                    setOper_TotalCapex(fieldState.value);
                }
                if (fieldState.key === 'Oper_FixedAmount') {
                    setOper_FixedAmount(fieldState.value);
                }
                if (fieldState.key === 'Oper_OperatingMining') {
                    setOper_OperatingMining(fieldState.value);
                }
                if (fieldState.key === 'Oper_OperatingMilling') {
                    setOper_OperatingMilling(fieldState.value);
                }
                if (fieldState.key === 'Oper_OperatingProcessing') {
                    setOper_OperatingProcessing(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["Oper_Operating"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'Oper_Operating') {
            setOper_Operating(value);
            if (value == 'Total Capex') {
                handleInputChange('Oper_FixedAmount', '');
                handleInputChange('Oper_OperatingMining', '0');
                handleInputChange('Oper_OperatingMilling', '0');
                handleInputChange('Oper_OperatingProcessing', '0');
            }
            else if(value == 'Fixed Amount') {
                handleInputChange('Oper_TotalCapex', '');
                handleInputChange('Oper_OperatingMining', '0');
                handleInputChange('Oper_OperatingMilling', '0');
                handleInputChange('Oper_OperatingProcessing', '0');
            }
            else if(value == 'Production') {
                handleInputChange('Oper_FixedAmount', '');
                handleInputChange('Oper_TotalCapex', '');
            }
        }
        if (key === 'Oper_TotalCapex') {
            setOper_TotalCapex(value);
        }
        if (key === 'Oper_FixedAmount') {
            setOper_FixedAmount(value);
        }
        if (key === 'Oper_OperatingMining') {
            setOper_OperatingMining(value);
        }
        if (key === 'Oper_OperatingMilling') {
            setOper_OperatingMilling(value);
        }
        if (key === 'Oper_OperatingProcessing') {
            setOper_OperatingProcessing(value);
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
            <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
                <Grid item xs={8}>
                    <h6 className="text-sm pb-2">Subject</h6>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={Oper_Operating}
                        onChange={(e) => { // @ts-ignore
                            handleInputChange('Oper_Operating', e.target.value)
                        }}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel
                            value="Total Capex"
                            control={<Radio />}
                            label="Total Capex"
                        />
                        {Oper_Operating === 'Total Capex' && (
                            <Grid container spacing={2} sx={{ display: "block" }}>
                                <Grid item xs={6} md={6}>
                                    <h6 className="text-sm pb-2">Total Capex (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="Oper_TotalCapex"
                                        autoComplete="off"
                                        value={Oper_TotalCapex}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("Oper_TotalCapex", value);
                                        }}
                                        type={"number"}
                                        inputProps={{
                                            inputMode: "numeric",
                                            min: "0",
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <FormControlLabel
                            value="Fixed Amount"
                            control={<Radio />}
                            label="Fixed Amount"
                        />
                        {Oper_Operating === 'Fixed Amount' && (
                            <Grid container spacing={2} sx={{ display: "block" }}>
                                <Grid item xs={6} md={6}>
                                    <h6 className="text-sm pb-2">Fixed Amount (USD)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="Oper_FixedAmount"
                                        autoComplete="off"
                                        value={Oper_FixedAmount}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("Oper_FixedAmount", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        )}
                        <FormControlLabel
                            value="Production"
                            control={<Radio />}
                            label="Production"
                        />
                    </RadioGroup>
                </Grid>
            </Grid>
            {Oper_Operating === 'Production' && (
                <Grid container spacing={2} sx={{ display: "block" }}>
                    <Grid item xs={6} md={6}>
                        <h6 className="text-sm pb-2">Mining (USD/MT Ore)</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="Oper_OperatingMining"
                            autoComplete="off"
                            value={Oper_OperatingMining}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("Oper_OperatingMining", value);
                            }}
                            type={"text"}
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <h6 className="text-sm pb-2">Milling (USD/MT Ore)</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="Oper_OperatingMilling"
                            autoComplete="off"
                            value={Oper_OperatingMilling}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("Oper_OperatingMilling", value);
                            }}
                            type={"text"}
                            InputProps={{
                                inputProps: { min: 0 },
                            }}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <h6 className="text-sm pb-2">Processing (USD/MT Ore)</h6>
                        <TextField
                            className="w-full"
                            size={"small"}
                            name="Oper_OperatingProcessing"
                            autoComplete="off"
                            value={Oper_OperatingProcessing}
                            onChange={(e) => {
                                const value = e.target.value;
                                handleInputChange("Oper_OperatingProcessing", value);
                            }}
                            error={validated && !Oper_OperatingProcessing}
                            helperText={
                                validated &&
                                    (!Oper_OperatingProcessing || parseFloat(Oper_OperatingProcessing) <= 0)
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

export default withFormFieldsState(Operating as React.ComponentType<Omit<OperatingProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);