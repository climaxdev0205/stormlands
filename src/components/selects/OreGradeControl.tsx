import React from "react";
import {
    Grid,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const dataset = [
    {
      label: "Ore Grade",
      options: ["Zinc", "Lead", "Silver", "Gold"],
    },
    {
      label: "Value",
      options: [8.7],
    },
    {
      label: "Units",
      options: ["%"],
    },
  ];

interface OreGradeControlProps {
    index: number;
    controlValues: any[];
    handleInputChange: (
        index: number,
        field: "oreGrade" | "value" | "units",
        value: string | number,
    ) => void;
    removeControl: (index: number) => void;
    validated: boolean;
}

const OreGradeControl: React.FC<OreGradeControlProps> = ({
    index,
    controlValues,
    handleInputChange,
    removeControl,
    validated,
}) => {
    return (
        <Grid key={index} container spacing={2} justifyContent="center" sx={{ maxWidth: 700, marginBottom: 1 }}>
            <Grid item xs={6} md={6}>
                <FormControl
                    sx={{ minWidth: 60, maxWidth: 500 }}
                    fullWidth
                    size="small"
                >
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                        Ore Grade {index + 1}
                    </InputLabel>
                    <Select
                        labelId={`demo-simple-select-label-${index}`}
                        id={`demo-simple-select-${index}`}
                        // value={controlValues[index]?.oreGrade || ""}
                        name="name"
                        label={"Ore Grade"}
                        // onChange={(e) => handleInputChange(index, "oreGrade", e.target.value)}
                        error={!controlValues[index]?.oreGrade}
                    >
                        {dataset[0].options.map((value: any, index: number) => {
                            return (
                                <MenuItem key={index} value={value}>
                                    {value}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{ marginBottom: "10px" }}>
                    <TextField
                        size={"small"}
                        label={"Value"}
                        type="number"
                        autoComplete="off"
                        // value={controlValues[index]?.value || ""}
                        onChange={(e) =>
                            handleInputChange(index, "value", parseFloat(e.target.value))
                        }
                        name="value"
                        InputLabelProps={{ inputMode: "numeric", shrink: true }}
                        error={validated && (!controlValues[index]?.value || controlValues[index]?.value <= 0)}
                        helperText={
                            validated && (!controlValues[index]?.value || controlValues[index]?.value <= 0)
                                ? "Value is required and must be greater than 0"
                                : ""
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth size="small">
                    <InputLabel id={`demo-simple-select-label-${index}`}>
                        {dataset[2].label}
                    </InputLabel>
                    <Select
                        labelId={`demo-simple-select-label-${index}`}
                        id={`demo-simple-select-${index}`}
                        // value={controlValues[index]?.units || "%"}
                        label={dataset[2].label}
                        // onChange={(e) => handleInputChange(index, "units", e.target.value)}
                    >
                        <MenuItem value="%">{dataset[2].options[0]}</MenuItem>
                    </Select>
                    <IconButton
                        size="small"
                        onClick={() => removeControl(index)}
                        sx={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)" }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default OreGradeControl;