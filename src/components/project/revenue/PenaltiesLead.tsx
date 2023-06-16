import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, Switch, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Button, IconButton } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import SelectControl from '@components/selects/SelectControl';
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

interface PenaltiesLeadProps extends WithFormFieldsStateProps {
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
const PenaltiesLead: React.FC<PenaltiesLeadProps> = ({
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
    const [checked, setChecked] = useState(false);

    //Values for field states
    const [Penalties_L_Element, setPenalties_L_Element] = useState<string | null>(null);
    const [Penalties_L_Charge, setPenalties_L_Charge] = useState<string | null>(null);
    const [Penalties_L_Each, setPenalties_L_Each] = useState<string | null>(null);
    const [Penalties_L_Above, setPenalties_L_Above] = useState<string | null>(null);

    const PenaltyStructItems = [
        { 
            penalty: 'Select Penalty', 
        },{ 
            penalty: 'Arsenic', 
            charge: 0,
            each:   0,
            above:  0
        },{ 
            penalty: 'Antimony', 
            charge: 0,
            each:   0,
            above:  0
        },{ 
            penalty: 'Bismuth', 
            charge: 0,
            each:   0,
            above:  0
        },
    ];
    
    // Values for Menu Items
    const [PenaltyItems, setPenaltyItems] = useState<any[]>([
        'Select Penalty',
        'Arsenic', 
        'Antimony', 
        'Bismuth'
    ]);

    const [selectedPenalties, setSelectedPenalties] = useState<any[]>([]);

    const getDisableMenuState = (item : any, current : any) => {
        if (item === 'Select Penalty') return false;
        if (item === current.penalty)   return true;
        for (let i = 0; i < selectedPenalties.length; i ++)
            if (item === selectedPenalties[i].penalty)   
                return false;
        return true;
    }

    const handleSelectChange = (value : any, index : number) => {
        if (selectedPenalties.length && selectedPenalties[index].penalty === value)  return;

        const modified = [...selectedPenalties];
        const nIndex = PenaltyItems.indexOf(value);

        if (nIndex < 0)  return;
        modified[index] = PenaltyStructItems[nIndex];
        setSelectedPenalties(modified);
    }

    const handleAddPenalty = () => {
        for (let i = 1; i < 4; i ++)
        {
            let flg = false;
            for (let j = 0; j < selectedPenalties.length; j ++)
                if(selectedPenalties[j].penalty === PenaltyItems[i]) {
                    flg = true;
                    break;
                }
            if (!flg) {
                setSelectedPenalties([...selectedPenalties, PenaltyStructItems[i]])
                return;
            }
        }
    };

    useMemo(() => {
        // console.log("selectControlValues", selectControlValues);
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'Penalties_L_Element') {
                    setPenalties_L_Element(fieldState.value);
                }
                if (fieldState.key === 'Penalties_L_Charge') {
                    setPenalties_L_Charge(fieldState.value);
                }
                if (fieldState.key === 'Penalties_L_Each') {
                    setPenalties_L_Each(fieldState.value);
                }
                if (fieldState.key === 'Penalties_L_Above') {
                    setPenalties_L_Above(fieldState.value);
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
        if (key === 'Penalties_L_Element') {
            setPenalties_L_Element(value);
        }
        if (key === 'Penalties_L_Charge') {
            setPenalties_L_Charge(value);
        }
        if (key === 'Penalties_L_Each') {
            setPenalties_L_Each(value);
        }
        if (key === 'Penalties_L_Above') {
            setPenalties_L_Above(value);
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

    interface PenaltyData {
        Element: string;
        Charge: string;
        Each: string;
        Above: string;
    }


    const [resourceData, setResourceData] = useState<PenaltyData[]>([{
        Element: "Arsenic",
        Charge: "0",
        Each: "0",
        Above: "0"
    }]);

    const removeItemAt = (index: number) => {
        setSelectedPenalties(selectedPenalties.filter((_, i) => { return i !== index }));
    }

    const addItem = (nData: PenaltyData) => {
        setResourceData([...resourceData, nData]);
    }

    const switchHandler = () => {
        setChecked(!checked);
    };

    return (
        <div className="flex flex-col p-6 mt-5">
            {
                selectedPenalties.length == 0 ?
                    <>
                        <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                            <Grid item xs={6} md={6}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Element</h6>
                                    <Select
                                        value={PenaltyItems[0]}
                                        // labelId={`demo-simple-select-label-${Penalties_L_Element}`}
                                        // id={`demo-simple-select-${Penalties_L_Element}`}
                                        onChange={ (e)=> {handleSelectChange(e.target.value, 0)} }
                                        name="name"
                                    >
                                        {
                                            PenaltyItems.map((item, index) => {
                                                return (
                                                    <MenuItem value={item}  disabled={index != 0 ? false : true}>
                                                        { item }
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Charge (USD)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="name"
                                        autoComplete="off"
                                        value={Penalties_L_Charge}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("Penalties_L_Charge", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                            readOnly: true,
                                            style: {
                                                backgroundColor: 'rgba(229, 231, 235, 0.38)', // Set background color for the input
                                                borderRadius: 4, // Add border radius to the input
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                            <Grid item xs={3} md={3}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Each</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="name"
                                        autoComplete="off"
                                        value={Penalties_L_Each}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("Penalties_L_Each", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                            readOnly: true,
                                            style: {
                                                backgroundColor: 'rgba(229, 231, 235, 0.38)', // Set background color for the input
                                                borderRadius: 4, // Add border radius to the input
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Units</h6>
                                    <Select
                                        labelId={`demo-simple-select-label-${Penalties_L_Each}`}
                                        id={`demo-simple-select-${Penalties_L_Each}`}
                                        value="%"
                                        name="name"
                                        disabled={true}
                                    >
                                        <MenuItem value="%">
                                            %
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                            <Grid item xs={3} md={3}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Above</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        name="name"
                                        autoComplete="off"
                                        value={Penalties_L_Above}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            handleInputChange("Penalties_L_Above", value);
                                        }}
                                        type={"number"}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                            readOnly: true,
                                            style: {
                                                backgroundColor: 'rgba(229, 231, 235, 0.38)', // Set background color for the input
                                                borderRadius: 4, // Add border radius to the input
                                            },
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} md={3}>
                                <FormControl
                                    sx={{ minWidth: 60, maxWidth: 500 }}
                                    fullWidth
                                    size="small"
                                >
                                    <h6 className="text-sm pb-2">Unit</h6>
                                    <Select
                                        labelId={`demo-simple-select-label-${Penalties_L_Above}`}
                                        id={`demo-simple-select-${Penalties_L_Above}`}
                                        value="%"
                                        name="name"
                                        disabled={true}
                                    >
                                        <MenuItem value="%">
                                            %
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </> 
                :
                selectedPenalties.map((pData, index) => {
                    return (
                        <>
                            <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                                <Grid item xs={6} md={6}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Element</h6>
                                        
                                        <Select
                                            labelId={`demo-simple-select-label-${pData.penalty}`}
                                            id={`demo-simple-select-${pData.penalty}`}
                                            value={pData.penalty}
                                            onChange={ (e)=> {handleSelectChange(e.target.value, index)} }
                                            name="name"
                                        >
                                            {
                                                PenaltyItems.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item}  disabled={!getDisableMenuState(item, pData)}>
                                                            { item }
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Charge (USD)</h6>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="name"
                                            autoComplete="off"
                                            value={pData.charge}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                let modification = [...selectedPenalties];
                                                let curModification = pData;

                                                curModification.charge = value;
                                                modification[index] = curModification;
                                                setSelectedPenalties(modification);
                                            }}
                                            type={"number"}
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Each</h6>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="name"
                                            autoComplete="off"
                                            value={pData.each}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                let modification = [...selectedPenalties];
                                                let curModification = pData;

                                                curModification.each = value;
                                                modification[index] = curModification;
                                                setSelectedPenalties(modification);
                                            }}
                                            type={"number"}
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Units</h6>
                                        <Select
                                            labelId={`demo-simple-select-label-${Penalties_L_Each}`}
                                            id={`demo-simple-select-${Penalties_L_Each}`}
                                            value="%"
                                            name="name"
                                        >
                                            <MenuItem value="%">
                                                %
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1} xs={8} sx={{marginTop: 1}}>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Above</h6>
                                        <TextField
                                            className="w-full"
                                            size={"small"}
                                            name="name"
                                            autoComplete="off"
                                            value={pData.above}
                                            onChange={(e) => {
                                                const value = parseInt(e.target.value);
                                                let modification = [...selectedPenalties];
                                                let curModification = pData;

                                                curModification.above = value;
                                                modification[index] = curModification;
                                                setSelectedPenalties(modification);
                                            }}
                                            type={"number"}
                                            InputProps={{
                                                inputProps: { min: 0 },
                                            }}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2">Unit</h6>
                                        <Select
                                            labelId={`demo-simple-select-label-${Penalties_L_Above}`}
                                            id={`demo-simple-select-${Penalties_L_Above}`}
                                            value="%"
                                            name="name"
                                        >
                                            <MenuItem value="%">
                                                %
                                            </MenuItem>
                                        </Select>
                                        
                                        <Button
                                            size="small"
                                            variant='contained'
                                            onClick={() => removeItemAt(index)}
                                            sx={{ position: 'absolute', left: "105%", top: "47%", backgroundColor: "grey"}}
                                        >
                                            remove
                                        </Button>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </>
                    )
                })
            }

            
            <Box mt={2} mb={6}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddPenalty}
                >
                    Add More Penalty
                </Button>
            </Box>


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

export default withFormFieldsState(PenaltiesLead as React.ComponentType<Omit<PenaltiesLeadProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);