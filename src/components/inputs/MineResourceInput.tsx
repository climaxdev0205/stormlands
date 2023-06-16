import React, { useState } from 'react';
import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import NumberFormatCustom from '@utils/NumberFormatMUI';

interface MineResourcesInputProps {
    validated: boolean;
    onHandleInput: (key: string, value: string) => void;
    mineResourcesValue: string | null;
    specificGravityValue: string | null;
}

const MineResourceInput: React.FC<MineResourcesInputProps> = ({
    validated,
    onHandleInput,
    mineResourcesValue,
    specificGravityValue,
}) => {

    return (
        <Grid
            container
            spacing={3}
            justifyContent={{ xs: "flex-start", md: "flex-start" }}
            sx={{ maxWidth: 700 }}
        >
            <Grid item xs={6}>
            <Box sx={{ marginBottom: "10px" }}>
                <FormControl fullWidth size="small">
                <h6 className="text-sm pb-2">Mine Resources</h6>
                    <TextField
                        className="w-full"
                        size={"small"}
                        name="name"
                        autoComplete="off"
                        value={mineResourcesValue}
                        onChange={(e) => {
                            const value = e.target.value;
                            onHandleInput("MR_MineResources", value);
                        }}
                        error={validated && !mineResourcesValue}
                        helperText={
                            validated &&
                                (!mineResourcesValue || parseFloat(mineResourcesValue) <= 0)
                                ? "Required and must be greater than 0"
                                : ""
                        } 
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                        }}
                        InputProps={{
                            inputComponent: NumberFormatCustom,
                        }}
                        required
                    />
                </FormControl>
            </Box>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth size="small">
                <h6 className="text-sm pb-2">Units</h6>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"MT"}
                        onChange={() => { }}
                    >
                        <MenuItem value={"MT"}>{"MT"}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth size="small">
                <h6 className="text-sm pb-2">Specific Gravity</h6>
                    <TextField
                        className="w-full"
                        size={"small"}
                        autoComplete="off"
                        value={specificGravityValue || ""}
                        onChange={(e) => {
                            const value = e.target.value;
                            onHandleInput("MR_SpecificGravity", value);
                          }}
                        name="name"
                        type={"number"}
                        inputProps={{
                            inputMode: "numeric",
                            min: "0",
                            step: "0.1",
                        }}
                    />

                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth size="small">
                <h6 className="text-sm pb-2">Units</h6>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"kg/cm3"}
                        onChange={() => { }}
                    >
                        <MenuItem value={"kg/cm3"}>{"kg/cm3"}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default MineResourceInput;