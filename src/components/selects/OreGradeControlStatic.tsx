import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    FormControl,
    Button,
    Select,
    MenuItem,
    TextField,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface OreGradeControlProps {
    onHandleInput: (key: string, value: string) => void;
    validated: boolean;
    MR_ZincResources: string | null;
    MR_LeadResources: string | null;
}

const OreGradeControl: React.FC<OreGradeControlProps> = ({
    onHandleInput,
    validated,
    MR_ZincResources,
    MR_LeadResources,
}) => {
    const getInitialSelectedOres = () => {
        const ores = [];

        if (MR_ZincResources !== null && MR_ZincResources !== "") {
            ores.push({ ore: "Zinc", value: MR_ZincResources, unit: "%" });
        }

        if (MR_LeadResources !== null && MR_LeadResources !== "") {
            ores.push({ ore: "Lead", value: MR_LeadResources, unit: "%" });
        }

        return ores;
    };

    const [selectedOres, setSelectedOres] = useState<any[]>(getInitialSelectedOres());

    const updateSelectedOres = (currentOres: any[], oreType: string, oreValue: string | null) => {
        const updatedOres = [...currentOres];
        const existingOreIndex = updatedOres.findIndex((ore) => ore.ore === oreType);

        if (oreValue) {
            if (existingOreIndex !== -1) {
                updatedOres[existingOreIndex] = { ore: oreType, value: oreValue, unit: "%" };
            } else {
                updatedOres.push({ ore: oreType, value: oreValue, unit: "%" });
            }
        } else {
            if (existingOreIndex !== -1) {
                updatedOres.splice(existingOreIndex, 1);
            }
        }

        return updatedOres;
    };

    useEffect(() => {
        setSelectedOres((currentOres) => updateSelectedOres(currentOres, "Zinc", MR_ZincResources));
    }, [MR_ZincResources]);

    useEffect(() => {
        setSelectedOres((currentOres) => updateSelectedOres(currentOres, "Lead", MR_LeadResources));
    }, [MR_LeadResources]);

    const handleOreChange = (index: number, field: string, value: any) => {
        const newSelectedOres = [...selectedOres];
        const otherOreIndex = index === 0 ? 1 : 0;

        if (selectedOres.length === 0 && index === 0) {
            newSelectedOres[index] = {ore: "", value: "", unit: "%"}
        }

        if (field === "ore") {
            if (newSelectedOres.length > 1 && newSelectedOres[otherOreIndex].ore === value) {
                newSelectedOres[otherOreIndex].ore = "";
                newSelectedOres[otherOreIndex].value = "";
            }
            newSelectedOres[index].ore = value;
        } else if (field === "value") {
            newSelectedOres[index].value = value;
        }

        setSelectedOres(newSelectedOres);

        if (field === "value") {
            onHandleInput(`MR_${newSelectedOres[index].ore}Resources`, value);
        }
    };

    const handleAddOre = () => {
        if (selectedOres.length < 2) {
            const newSelectedOres = [...selectedOres];
            let newOre;

            if (newSelectedOres.length === 0) {
                newOre = "Lead";
            } else {
                const existingOre = newSelectedOres[0].ore;
                newOre = existingOre === "Lead" ? "Zinc" : "Lead";
            }

            newSelectedOres.push({
                ore: newOre,
                value: "",
                unit: "%",
            });

            setSelectedOres(newSelectedOres);
        }
    };

    const handleRemoveOre = (index: number) => {
        const newSelectedOres = [...selectedOres];
        onHandleInput(`MR_${newSelectedOres[index].ore}Resources`, "");
        newSelectedOres.splice(index, 1);
        
        // Ensure there is always at least one row
        // if (newSelectedOres.length === 0) {
        //     newSelectedOres.push({
        //         ore: "Select Ore",
        //         value: "",
        //         unit: "%",
        //     });
        // }
        
        setSelectedOres(newSelectedOres);
        console.log("Remove Action")
    };

    const isDisabled = (ore: string, index: number) => {
        const otherOreIndex = index === 0 ? 1 : 0;

        if (ore === "Gold" || ore === "Silver") {
            return true;
        }

        return selectedOres.length > 1 && selectedOres[otherOreIndex].ore === ore;

    };

    console.log(selectedOres)

    return (
        <>
            <Grid container spacing={2} justifyContent="center">
                {selectedOres.length === 0 ?
                    (<React.Fragment>
                        <Grid item xs={6} md={6}>
                            <FormControl fullWidth size="small">
                                <h6 className="text-sm pb-2">Ore Grade</h6>
                                <Select
                                    value={"Select Ore"}
                                    onChange={(e) =>
                                        handleOreChange(0, "ore", e.target.value)
                                    }
                                >
                                    <MenuItem value="Select Ore" disabled>
                                        Select Ore
                                    </MenuItem>
                                    {["Zinc", "Lead", "Gold", "Silver"].map((ore) => (
                                        <MenuItem value={ore} key={ore} disabled={isDisabled(ore, 0)}>
                                            {ore.charAt(0).toUpperCase() + ore.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ marginBottom: "10px" }}>
                                <h6 className="text-sm pb-2">Value</h6>
                                <TextField
                                    size={"small"}
                                    disabled
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth size="small">
                                <h6 className="text-sm pb-2">Units</h6>
                                <Select>
                                    <MenuItem value="%">%</MenuItem>
                                </Select>
                                <IconButton
                                    size="small"
                                    sx={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", marginTop: 2 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </FormControl>
                        </Grid>
                    </React.Fragment>
                ) : null }
                {selectedOres.map((selectedOre, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={6} md={6}>
                            <FormControl fullWidth size="small">
                                <h6 className="text-sm pb-2">Ore Grade</h6>
                                <Select
                                    value={selectedOre.ore}
                                    onChange={(e) =>
                                        handleOreChange(index, "ore", e.target.value)
                                    }
                                >
                                    <MenuItem value="Select Ore" disabled>
                                        Select Ore
                                    </MenuItem>
                                    {["Zinc", "Lead", "Gold", "Silver"].map((ore) => (
                                        <MenuItem value={ore} key={ore} disabled={isDisabled(ore, index)}>
                                            {ore.charAt(0).toUpperCase() + ore.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Box sx={{ marginBottom: "10px" }}>
                                <h6 className="text-sm pb-2">Value</h6>
                                <TextField
                                    size={"small"}
                                    type="number"
                                    autoComplete="off"
                                    value={selectedOre.value}
                                    onChange={(e) =>
                                        handleOreChange(index, "value", e.target.value)
                                    }
                                    name="value"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        inputMode: "decimal",
                                        step: "0.1",
                                        min: "0",
                                    }}
                                    error={
                                        validated &&
                                        (!selectedOre.value || parseFloat(selectedOre.value) <= 0)
                                    }
                                    helperText={
                                        validated &&
                                        (!selectedOre.value || parseFloat(selectedOre.value) <= 0) &&
                                        "Value is required and must be greater than 0"
                                    }
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth size="small">
                                <h6 className="text-sm pb-2">Units</h6>
                                <Select
                                    value={selectedOre.unit}
                                    onChange={(e) =>
                                        handleOreChange(index, "unit", e.target.value)
                                    }
                                >
                                    <MenuItem value="%">%</MenuItem>
                                </Select>
                                <IconButton
                                    size="small"
                                    onClick={() => handleRemoveOre(index)}
                                    sx={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", marginTop: 2 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </FormControl>
                        </Grid>
                    </React.Fragment>
                ))}
            </Grid>
            <Box mt={2} mb={6}>
                <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddOre}
                >
                    Add More Ore Grades
                </Button>
            </Box>
        </>
    );
};

export default OreGradeControl;