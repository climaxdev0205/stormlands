import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Button, Menu, IconButton} from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import SelectControl from '@components/selects/SelectControl';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface PayablesProps extends WithFormFieldsStateProps {
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
const Payables: React.FC<PayablesProps> = ({
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
    const [Payables_L_Payable, setPayables_L_Payable] = useState<string | null>(null);
    const [Payables_L_PayPercentage, setPayables_L_PayPercentage] = useState<number | null>(0);
    const [Payables_L_Subject, setPayables_L_Subject] = useState<string | null>(null);
    const [Payables_L_Deductions, setPayables_L_Deductions] = useState<string | null>(null);
    const [Payables_S_Payable, setPayables_S_Payable] = useState<string | null>(null);
    const [Payables_S_PayPercentage, setPayables_S_PayPercentage] = useState<number | null>(0);
    const [Payables_S_Subject, setPayables_S_Subject] = useState<string | null>(null);
    const [Payables_S_Deductions, setPayables_S_Deductions] = useState<string | null>(null);
    const [Payables_G_Payable, setPayables_G_Payable] = useState<string | null>(null);
    const [Payables_G_PayPercentage, setPayables_G_PayPercentage] = useState<number | null>(0);
    const [Payables_G_Subject, setPayables_G_Subject] = useState<string | null>(null);
    const [Payables_G_Deductions, setPayables_G_Deductions] = useState<string | null>(null);
    
    const PayableStructItems = [
        { 
            payable: 'Select Payable', 
            percentage: '',
            setPercentage: null,
            subject: '',
            setSubject: null,
            deduction: '',
            setDeduction: null
        },{ 
            payable: 'Lead', 
            payableM: 'Payables_L_PayPercentage',
            payableD: 'Payables_L_Deductions',
            percentage: useMemo(() => { return Payables_L_PayPercentage }, [Payables_L_PayPercentage]),
        },{ 
            payable: 'Silver', 
            payableM: 'Payables_S_PayPercentage',
            payableD: 'Payables_S_Deductions',
            percentage: useMemo(() => { return Payables_S_PayPercentage }, [Payables_S_PayPercentage]),
        },{ 
            payable: 'Gold', 
            payableM: 'Payables_G_PayPercentage',
            payableD: 'Payables_G_Deductions',
            percentage: useMemo(() => { return Payables_G_PayPercentage }, [Payables_G_PayPercentage]),
        },
    ];
    
    const getInitialSelectedPayable = () : any => {
        const ores : any[] = [];
        ores.push(PayableStructItems[1])
        return ores;
    };

    // Values for Menu Items
    const [PayableItems, setPayableItems] = useState<any[]>([
        'Select Payable',
        'Lead', 
        'Silver', 
        'Gold'
    ]);
    const [selectedPayables, setSelectedPayables] = useState<any[]>(getInitialSelectedPayable());

    const getDisableMenuState = (item : any, current : any) => {
        if (item === 'Select Payable') return false;
        if (item === current.payable)   return true;
        for (let i = 0; i < selectedPayables.length; i ++)
            if (item === selectedPayables[i].payable)   
                return false;
        return true;
    }

    const handleSelectChange = (value : any, index : number) => {
        if (selectedPayables.length && selectedPayables[index].payable === value)  return;

        const modified = [...selectedPayables];
        const nIndex = PayableItems.indexOf(value);

        if (nIndex < 0)  return;
        modified[index] = PayableStructItems[nIndex];
        setSelectedPayables(modified);
    }

    const handleAddPayable = () => {
        for (let i = 1; i < 4; i ++)
        {
            let flg = false;
            for (let j = 0; j < selectedPayables.length; j ++)
                if(selectedPayables[j].payable === PayableItems[i]) {
                    flg = true;
                    break;
                }
            if (!flg) {
                setSelectedPayables([...selectedPayables, PayableStructItems[i]])
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
                if (fieldState.key === 'Payables_L_Payable') {
                    setPayables_L_Payable(fieldState.value);
                }
                if (fieldState.key === 'Payables_L_PayPercentage') {
                    setPayables_L_PayPercentage(parseInt(fieldState.value));
                }
                if (fieldState.key === 'Payables_L_Subject') {
                    setPayables_L_Subject(fieldState.value);
                }
                if (fieldState.key === 'Payables_L_Deductions') {
                    setPayables_L_Deductions(fieldState.value);
                }
                if (fieldState.key === 'Payables_S_Payable') {
                    setPayables_S_Payable(fieldState.value);
                }
                if (fieldState.key === 'Payables_S_PayPercentage') {
                    setPayables_S_PayPercentage(parseInt(fieldState.value));
                }
                if (fieldState.key === 'Payables_S_Subject') {
                    setPayables_S_Subject(fieldState.value);
                }
                if (fieldState.key === 'Payables_S_Deductions') {
                    setPayables_S_Deductions(fieldState.value);
                }
                if (fieldState.key === 'Payables_G_Payable') {
                    setPayables_G_Payable(fieldState.value);
                }
                if (fieldState.key === 'Payables_G_PayPercentage') {
                    setPayables_G_PayPercentage(parseInt(fieldState.value));
                }
                if (fieldState.key === 'Payables_G_Subject') {
                    setPayables_G_Subject(fieldState.value);
                }
                if (fieldState.key === 'Payables_G_Deductions') {
                    setPayables_G_Deductions(fieldState.value);
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
        if (key === 'Payables_L_Payable') {
            setPayables_L_Payable(value);
        }
        if (key === 'Payables_L_PayPercentage') {
            setPayables_L_PayPercentage(parseInt(value));
        }
        if (key === 'Payables_L_Subject') {
            setPayables_L_Subject(value);
        }
        if (key === 'Payables_L_Deductions') {
            setPayables_L_Deductions(value);
        }
        if (key === 'Payables_S_Payable') {
            setPayables_S_Payable(value);
        }
        if (key === 'Payables_S_PayPercentage') {
            setPayables_S_PayPercentage(parseInt(value));
        }
        if (key === 'Payables_S_Subject') {
            setPayables_S_Subject(value);
        }
        if (key === 'Payables_S_Deductions') {
            setPayables_S_Deductions(value);
        }
        if (key === 'Payables_G_Payable') {
            setPayables_G_Payable(value);
        }
        if (key === 'Payables_G_PayPercentage') {
            setPayables_G_PayPercentage(parseInt(value));
        }
        if (key === 'Payables_G_Subject') {
            setPayables_G_Subject(value);
        }
        if (key === 'Payables_G_Deductions') {
            setPayables_G_Deductions(value);
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

    interface PayableData {
        Value : string,
        Units : string
    }
    
    const [resourceData, setResourceData] = useState<PayableData[]>([{
        Value: "0",
        Units: "%"
    }]);

    const removeItemAt = (index : number) => {
        // setResourceData(resourceData.filter((_, i) => { return i !== index }));
        setSelectedPayables(selectedPayables.filter((_, i) => { return i !== index }));
    }

    const addItem  = (nData : PayableData) => {
        setResourceData([...resourceData, nData]);
    }

    return (
        <div>
            <div className="flex grow flex-col items-start h-full mt-5 p-6">
                <div style={{width: "100%"}}>
                    {
                        selectedPayables.length == 0 ? 
                        <>
                            <Grid container spacing={2} sx={{ maxWidth: 700}}>
                                <Grid item xs={3} md={3}>
                                    <FormControl
                                        sx={{ minWidth: 60, maxWidth: 500 }}
                                        fullWidth
                                        size="small"
                                    >
                                        <h6 className="text-sm pb-2 mt-6">Payable</h6>
                                        <Select
                                            value={PayableItems[0]}
                                            onChange={ (e)=> {handleSelectChange(e.target.value, 0)} }
                                            name="name"
                                        >
                                            {
                                                PayableItems.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item} disabled={index != 0 ? false : true}>
                                                            {item}
                                                        </MenuItem>
                                                    );
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
                                    <h6 className="text-sm pb-2 mt-6">Pay Percentage (%)</h6>
                                    <TextField
                                        className="w-full"
                                        size={"small"}
                                        type={"number"}
                                        InputProps={{
                                            inputProps: { min: 0 },
                                        }}
                                        disabled={true}
                                    />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </>
                        : 
                        selectedPayables.map((pData, index) => {
                            return (
                                <>
                                    <Grid container spacing={2} sx={{ maxWidth: 700}}>
                                        <Grid item xs={3} md={3}>
                                            <FormControl
                                                sx={{ minWidth: 60, maxWidth: 500 }}
                                                fullWidth
                                                size="small"
                                            >
                                                <h6 className="text-sm pb-2 mt-6">Payable</h6>
                                                <Select
                                                    labelId={`demo-simple-select-label-${pData.payable}`}
                                                    id={`demo-simple-select-${pData.payable}`}
                                                    value={pData.payable}
                                                    onChange={ (e)=> {handleSelectChange(e.target.value, index)} }
                                                    name="name"
                                                >
                                                    {
                                                        PayableItems.map((item) => {
                                                            return (
                                                                <MenuItem value={item} disabled={!getDisableMenuState(item, pData)}>
                                                                    {item}
                                                                </MenuItem>
                                                            );
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
                                            <h6 className="text-sm pb-2 mt-6">Pay Percentage (%)</h6>
                                            <TextField
                                                className="w-full"
                                                size={"small"}
                                                name="name"
                                                autoComplete="off"
                                                value={pData.percentage}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    pData.percentage = parseInt(e.target.value);
                                                    handleInputChange(pData.payableM, value);
                                                }}
                                                type={"number"}
                                                InputProps={{
                                                    inputProps: { min: 0 },
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                onClick={() => removeItemAt(index)}
                                                sx={{ position: "absolute", right: -40, top: "60%", transform: "translateY(-50%)", marginTop: 2 }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        })
                    }
                    
                    <Grid item xs={12} >
                        <FormControl>
                            <h6 className="text-sm pb-2 mt-6">Subject</h6>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                // value={Payables_L_Subject}
                                // onChange={(e) => { handleInputChange('Payables_L_Subject', e.target.value) }}
                                value={false}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Maximum"
                                    disabled={true}
                                />
                                <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Minimum"
                                    
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid container spacing={2} sx={{ maxWidth: 700, marginBottom: 1, marginTop: 2 }}>
                        <Grid item xs={3} md={3}>
                        <h6 className="text-sm pb-2">Deductions</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                name="name"
                                autoComplete="off"
                                value={Payables_L_Deductions}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    handleInputChange("Payables_L_Deductions", value);
                                }}
                                type={"number"}
                                InputProps={{
                                    inputProps: { min: 0 },
                                }}
                            />
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <FormControl
                                sx={{ minWidth: 60, maxWidth: 500, marginBottom: 2 }}
                                fullWidth
                                size="small"
                            >
                                <h6 className="text-sm pb-2">Units</h6>
                                <Select
                                    labelId={`demo-simple-select-label-${Payables_L_Payable}`}
                                    id={`demo-simple-select-${Payables_L_Payable}`}
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

                    <Box mt={2} mb={6}>
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={handleAddPayable}
                        >
                            Add More Payables
                        </Button>
                    </Box>
                </div>
            </div>

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
                    }}
                />
            </Box>
        </div>

    );
};

export default withFormFieldsState(Payables as React.ComponentType<Omit<PayablesProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);