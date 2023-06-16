import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { useMemo, useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import { FormField } from "src/API";
import NavigationButtons from "@components/project/NavigationButtons";

import NumberFormatCustom from '@utils/NumberFormatMUI';

interface CapexProps extends WithFormFieldsStateProps {
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

const Capex: React.FC<CapexProps> = ({
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
    const [radioValue, setRadioValue] = React.useState<string | null>(null);
    const [disableMineYear, setDisableMineYear] = React.useState<object>({ inputProps: { min: 0 } });
    const [disableOre, setDisableOre] = React.useState<object>({ inputProps: { min: 0 } });

    //Values for field states
    const [Capex_ConstructionPeriod, setCapex_ConstructionPeriod] = useState<string>('');
    const [Capex_Mine_Year1, setCapex_Mine_Year1] = useState<string | null>(null);
    const [Capex_Mine_Year2, setCapex_Mine_Year2] = useState<string | null>(null);
    const [Capex_OreTreatment_Year1, setCapex_OreTreatment_Year1] = useState<string | null>(null);
    const [Capex_OreTreatment_Year2, setCapex_OreTreatment_Year2] = useState<string | null>(null);

    useMemo(() => {

        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Capex_ConstructionPeriod') {
                    setCapex_ConstructionPeriod(fieldState.value);
                }
                if (fieldState.key === 'Capex_Mine_Year1') {
                    setCapex_Mine_Year1(fieldState.value);
                }
                if (fieldState.key === 'Capex_Mine_Year2') {
                    setCapex_Mine_Year2(fieldState.value);
                }
                if (fieldState.key === 'Capex_OreTreatment_Year1') {
                    setCapex_OreTreatment_Year1(fieldState.value);
                }
                if (fieldState.key === 'Capex_OreTreatment_Year2') {
                    setCapex_OreTreatment_Year2(fieldState.value);
                }
            }
            );
        }
    }, [formFieldsState]);

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };
    const requiredFields = ["Capex_Mine_Year1"];

    const handleValidate = () => {
        let valid = requiredFields.length > 0 ? onValidate(formFieldsState, requiredFields) : true;
        setValidated(!valid);
        return valid;
    };

    const handleInputChange = (key: string, value: string) => {
        if (key === 'Capex_ConstructionPeriod') {
            setCapex_ConstructionPeriod(value);
            if(value === '1') {
                handleInputChange('Capex_Mine_Year2', '0');
                handleInputChange('Capex_OreTreatment_Year2', '0');
            }
        }
        if (key === 'Capex_Mine_Year1') {
            setCapex_Mine_Year1(value);
        }
        if (key === 'Capex_Mine_Year2') {
            setCapex_Mine_Year2(value);
        }
        if (key === 'Capex_OreTreatment_Year1') {
            setCapex_OreTreatment_Year1(value);
        }
        if (key === 'Capex_OreTreatment_Year2') {
            setCapex_OreTreatment_Year2(value);
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
            <h6 className="self-start text-base mb-6">Construction Period</h6>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                <FormControl
                        sx={{ minWidth: 60, maxWidth: 500 }}
                        fullWidth
                        size="small"
                    >
                        <h6 className="text-xs pb-2">Number of Years (Max 2 Years)</h6>
                        <Select
                            labelId={`demo-simple-select-label-${Capex_ConstructionPeriod}`}
                            id={`demo-simple-select-${Capex_ConstructionPeriod}`}
                            name="name"
                            value={Capex_ConstructionPeriod || "1"}
                            onChange={(e) => {
                                const value = e.target.value;
                                // @ts-ignore
                                handleInputChange("Capex_ConstructionPeriod", String(value));
                            }}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ marginBottom: 1, marginTop: 2 }}>
                <Grid item xs={8}>
                    <h6 className="text-md pb-2">Capex Mine</h6>
                    <Grid container spacing={2} sx={{ marginBottom: 3, marginTop: 2 }}>
                        <Grid item xs={6} md={6}>
                            <h6 className="text-sm pb-2">Year 1</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                // label={"Year 1"}
                                name="name"
                                autoComplete="off"
                                value={Capex_Mine_Year1}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Capex_Mine_Year1", String(value));
                                }}
                                error={validated && !Capex_Mine_Year1}
                                helperText={
                                    validated &&
                                        (!Capex_Mine_Year1 || parseFloat(Capex_Mine_Year1) <= 0)
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
                        {Capex_ConstructionPeriod === '2' && (
                        <Grid item xs={6} md={6}>
                            <h6 className="text-sm pb-2">Year 2</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                // label={"Year 2"}
                                name="name"
                                autoComplete="off"
                                value={Capex_Mine_Year2}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Capex_Mine_Year2", value);
                                }}
                                type={"number"}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>
                        )}
                    </Grid>

                    <h6 className="text-md pb-2">Capex Ore Treatment</h6>
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid item xs={6} md={6}>
                            <h6 className="text-sm pb-2">Year 1</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                // label={"Year 1"}
                                name="name"
                                autoComplete="off"
                                value={Capex_OreTreatment_Year1}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Capex_OreTreatment_Year1", value);
                                }}
                                type={"number"}
                                // inputProps={{
                                //     inputMode: "numeric",
                                //     min: "0",
                                // }}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>
                        {Capex_ConstructionPeriod === '2' && (
                        <Grid item xs={6} md={6}>
                            <h6 className="text-sm pb-2">Year 2</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                // label={"Year 2"}
                                name="name"
                                autoComplete="off"
                                value={Capex_OreTreatment_Year2}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Capex_OreTreatment_Year2", value);
                                }}
                                type={"number"}
                                // inputProps={{
                                //     inputMode: "numeric",
                                //     min: "0",
                                // }}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                            />
                        </Grid>
                        )}
                    </Grid>
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

export default withFormFieldsState(Capex as React.ComponentType<Omit<CapexProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);
