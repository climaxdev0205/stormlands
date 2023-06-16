import React, { useMemo, useState, useEffect } from 'react';
import { FormField } from 'src/API';
import { Box, Button, FormControl, Grid, IconButton, MenuItem, Select, TextField } from '@mui/material';
import withFormFieldsState, { WithFormFieldsStateProps } from '../withFormFieldsState';
import NavigationButtons from '../NavigationButtons';
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface ConcentrateProductionProps extends WithFormFieldsStateProps {
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
const ConcentrateProduction: React.FC<ConcentrateProductionProps> = ({
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
    const [P_PC_ZincAnnualProd, setP_PC_ZincAnnualProd] = useState<string>('');
    const [P_PC_LeadAnnualProd, setP_PC_LeadAnnualProd] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState("");

    const [selectedConcentrates, setSelectedConcentrates] = useState<any[]>([]);
    const ConcentrateStructItems = [
        { 
            concentrate: 'Select Concentrates'
        },{ 
            concentrate: 'Copper Concentrates',
            annual: 0, 
        },{ 
            concentrate: 'Zinc Concentrates', 
            concentrateL: 'P_PC_ZincAnnualProd',
            annual: useMemo(() => { return P_PC_ZincAnnualProd }, [P_PC_ZincAnnualProd]),
        },{ 
            concentrate: 'Lead Concentrates', 
            concentrateL: 'P_PC_LeadAnnualProd',
            annual: useMemo(() => { return P_PC_LeadAnnualProd }, [P_PC_LeadAnnualProd]),
        },{ 
            concentrate: 'Gold Concentrates', 
            annual: 0,
        },{ 
            concentrate: 'Silver Concentrates', 
            annual: 0,
        },{ 
            concentrate: 'Other Concentrates', 
            annual: 0,
        }
    ];
    
    // Values for Menu Items
    const [ConcentrateItems, setConcentrateItems] = useState<any[]>([
        'Select Concentrates',
        'Copper Concentrates', 
        'Zinc Concentrates', 
        'Lead Concentrates',
        'Gold Concentrates',
        'Silver Concentrates',
        'Other Concentrates',
    ]);

    const [selectedConcentrateItems, setSelectedConcentrateItems] = useState<any[]>([]);
    
    const getEnableMenuState = (item : any, current : any) => {
        if (item === 'Select Concentrates') return false;
        if (item === current.concentrate)   return true;
        for (let i = 0; i < selectedConcentrateItems.length; i ++)
            if (item === selectedConcentrateItems[i].concentrate)   
                return false;
        let index = ConcentrateItems.indexOf(item);
        if(index < 2 || index > 3)  return false;
        return true;
    }

    const handleSelectChange = (value : any, index : number) => {
        if (selectedConcentrateItems.length && selectedConcentrateItems[index].concentrate === value)  return;

        const modified = [...selectedConcentrateItems];
        const nIndex = ConcentrateItems.indexOf(value);
        
        if (nIndex < 0)  return;
        modified[index] = ConcentrateStructItems[nIndex];
        setSelectedConcentrateItems(modified);
    }

    const handleAddConcentrate = () => {
        for (let i = 2; i < 4; i ++)
        {
            let flg = false;
            for (let j = 0; j < selectedConcentrateItems.length; j ++)
                if(selectedConcentrateItems[j].concentrate === ConcentrateItems[i]) {
                    flg = true;
                    break;
                }
            if (!flg) {
                setSelectedConcentrateItems([...selectedConcentrateItems, ConcentrateStructItems[i]])
                return;
            }
        }
    };

    const removeItemAt = (index : number) => {
        setSelectedConcentrateItems(selectedConcentrateItems.filter((_, i) => { return i !== index }));
    }

    const handleSave = () => {
        onSave(formFieldsState, subStepId);
    };

    const updateSelectedConcentrates = (currentConcentrates: any[], concentrate: string, concentrateValue: string | null) => {
        const updatedConcentrates = [...currentConcentrates];
        const existingConcentrateIndex = updatedConcentrates.findIndex((conc) => conc.concentrate === concentrate);

        if (concentrateValue) {
            if (existingConcentrateIndex !== -1) {
                updatedConcentrates[existingConcentrateIndex] = { concentrate: concentrate, value: concentrateValue };
            } else {
                updatedConcentrates.push({ concentrate: concentrate, value: concentrateValue});
            }
        } else {
            if (existingConcentrateIndex !== -1) {
                updatedConcentrates.splice(existingConcentrateIndex, 1);
            }
        }

        return updatedConcentrates;
    };

    // useEffect(() => {
    //     setSelectedConcentrates((currentConcentrates) => updateSelectedConcentrates(currentConcentrates, "P_PC_ZincAnnualProd", P_PC_ZincAnnualProd));
    // }, [P_PC_ZincAnnualProd]);

    // useEffect(() => {
    //     setSelectedConcentrates((currentConcentrates) => updateSelectedConcentrates(currentConcentrates, "P_PC_LeadAnnualProd", P_PC_LeadAnnualProd));
    // }, [P_PC_LeadAnnualProd]);

    // const handleConcentrateChange = (index: number, field: string, value: any) => {
        
    // };

    // const handleAddRow = (type: string) => {
    //     if (selectedConcentrates.length < 2) {
    //         const newConcentrate = { concentrate: type, value: "" };
    //         setSelectedConcentrates([...selectedConcentrates, newConcentrate]);
    //     }
    // };

    // const handleDeleteRow = (index: number) => {
    //     const deletedRow = selectedConcentrates[index];

    //     // Set the value of the deleted row to an empty string
    //     handleInputChange(deletedRow.concentrate, "");

    //     const newRowList = [...selectedConcentrates.slice(0, index), ...selectedConcentrates.slice(index + 1)];
    //     if (selectedConcentrates.length === 1) {
    //         setSelectedConcentrates([]);
    //     }
    //     else {
    //         setSelectedConcentrates(newRowList);
    //     }
    //     console.log("remove actions", newRowList)
    // };  
    
    useEffect(() => {
        console.log('formFieldsState', formFieldsState);
        if (formFieldsState.length > 0) {
            //loop through the formFieldsState and set the values for the fields
            formFieldsState.forEach((fieldState) => {
                if (fieldState.key === 'P_PC_ZincAnnualProd') {
                    setP_PC_ZincAnnualProd(fieldState.value);
                }
                if (fieldState.key === 'P_PC_LeadAnnualProd') {
                    setP_PC_LeadAnnualProd(fieldState.value);
                }
            });

            // Update the selectedConcentrates state based on the new values
            // setSelectedConcentrates((currentConcentrates) => {
            //     let updatedConcentrates = [...currentConcentrates];
            //     if (P_PC_ZincAnnualProd !== null && P_PC_ZincAnnualProd !== "") {
            //         updatedConcentrates = updateSelectedConcentrates(updatedConcentrates, "P_PC_ZincAnnualProd", P_PC_ZincAnnualProd);
            //     }
            //     if (P_PC_LeadAnnualProd !== null && P_PC_LeadAnnualProd !== "") {
            //         updatedConcentrates = updateSelectedConcentrates(updatedConcentrates, "P_PC_LeadAnnualProd", P_PC_LeadAnnualProd);
            //     }
            //     return updatedConcentrates;
            // });
        }
    }, [formFieldsState]);

    const handleValidate = () => {
        let isValid = false;
    
        // Check if at least one concentrate is present and has a value greater than zero
        for (const row of selectedConcentrates) {
            console.log('row', row);
            let value;
            if (row.concentrate === 'P_PC_ZincAnnualProd') {
                value = P_PC_ZincAnnualProd;
            } else if (row.concentrate === 'P_PC_LeadAnnualProd') {
                value = P_PC_LeadAnnualProd;
            } else {
                continue; // Skip the current iteration if the concentrate is not one of the expected types
            }
    
            if (value && parseFloat(value) > 0) {
                isValid = true;
                break;
            }
        }
    
        if (!isValid) {
            setErrorMessage("At least one concentrate is required");
        } else {
            setErrorMessage("");
        }
    
        setValidated(!isValid);
        return isValid;
    };

    const handleInputChange = (key: string, value: string) => {

        console.log('key', key);
        console.log('value', value);

        if (key === 'P_PC_ZincAnnualProd') {
            setP_PC_ZincAnnualProd(value);
        }
        if (key === 'P_PC_LeadAnnualProd') {
            setP_PC_LeadAnnualProd(value);
        }

        //update the formFieldsState with the new value
        const index = formFieldsState.findIndex((fieldState) => fieldState.key === key);

        //if a field with the key exists in the formFieldsState
        if (index > -1) {
            const newFormFieldsState = [...formFieldsState];
            // newFormFieldsState[index].key = key;
            newFormFieldsState[index].value = value;
            setFormFieldsState(newFormFieldsState);
        }
    };

    return (
        <div className="flex flex-col p-6 mt-5 grow">
            {selectedConcentrateItems.length == 0 ? (
                <Grid container spacing={2} sx={{marginTop: 1}}>
                    <Grid item xs={6}>
                        <FormControl
                            sx={{ minWidth: 60, maxWidth: 500 }}
                            fullWidth
                            size="small"
                        >
                            <h6 className="text-sm pb-2">Type 1</h6>
                            <Select
                                value = {ConcentrateItems[0]}
                                onChange={(e) => {
                                    handleSelectChange(e.target.value, 0)
                                }}
                                name="name"
                            >
                                {
                                    ConcentrateItems.map((item, index) => {
                                        return (
                                            <MenuItem value={item} disabled={index > 1 && index < 4 ? false : true}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <FormControl fullWidth size="small">
                            <h6 className="text-sm pb-2">Annual Production (WMT)</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                name="name"
                                disabled={true}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            ) : 
            selectedConcentrateItems.map((pData, index) => (
                <Grid container spacing={2} key={index} sx={{marginTop: 1}}>
                    <Grid item xs={6}>
                        <FormControl
                            sx={{ minWidth: 60, maxWidth: 500 }}
                            fullWidth
                            size="small"
                        >
                            <h6 className="text-sm pb-2">Type {index + 1}</h6>
                            <Select
                                value={pData.concentrate}
                                onChange={ (e)=> {handleSelectChange(e.target.value, index)} }
                                name='name'
                            >
                                {
                                    ConcentrateItems.map((item) => {
                                        return (
                                            <MenuItem value={item} disabled={!getEnableMenuState(item, pData)}>
                                                {item}
                                            </MenuItem>
                                        );
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} >
                        <FormControl fullWidth size="small">
                            <h6 className="text-sm pb-2">Annual Production (WMT)</h6>
                            <TextField
                                className="w-full"
                                size={"small"}
                                name="name"
                                autoComplete="off"
                                value={pData.annual}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    pData.annual = e.target.value;
                                    handleInputChange(pData.concentrateL, value);                                
                                }}
                                // error={validated && !(pData.concentrateL === 'P_PC_ZincAnnualProd' ? P_PC_ZincAnnualProd : P_PC_LeadAnnualProd)}
                                // helperText={
                                //     validated &&
                                //         (!(pData.concentrateL === 'P_PC_ZincAnnualProd' ? P_PC_ZincAnnualProd : P_PC_LeadAnnualProd) || parseFloat(selectedConcentrate === 'P_PC_ZincAnnualProd' ? P_PC_ZincAnnualProd : P_PC_LeadAnnualProd) <= 0)
                                //         ? "Required and must be greater than 0"
                                //         : ""
                                // }
                                type={"number"}
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                }}
                                required
                            />
                            <IconButton
                                onClick={() => removeItemAt(index)}
                                size="small"
                                sx={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", marginTop: 2 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </FormControl>
                    </Grid>
                </Grid>
            ))
            }
            <Box mt={2} mb={6}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddConcentrate}
                // disabled={rows.length >= 2}
                >
                    Add More Products
                </Button>
            </Box>
            {errorMessage && (
                <div className="text-red-500 mt-2 text-sm">
                    {errorMessage}
                </div>
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
                    }
                    }
                />
            </Box>
        </div>
    );
};

export default withFormFieldsState(ConcentrateProduction as React.ComponentType<Omit<ConcentrateProductionProps, 'formFieldsState' | 'setFormFieldsState' | 'subStepId'>>);