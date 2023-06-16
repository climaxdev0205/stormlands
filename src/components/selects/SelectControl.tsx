import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import OreGradeControl from "./OreGradeControl";
import AlertDialogSlide from "@components/ui/AlertDialog";

interface SelectControlProps {
    onControlValuesChange: (values: any[]) => void;
    caption?: string;
}
const SelectControl: React.FC<SelectControlProps> = ({ onControlValuesChange, caption }) => {
    const [controls, setControls] = useState([0]);
    const [controlValues, setControlValues] = useState<any[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleControlChange = (
        index: number,
        field: "oreGrade" | "value" | "units",
        value: string | number,
        fieldId?: string
    ) => {
        const newControlValues = [...controlValues];
        if (!newControlValues[index]) {
            newControlValues[index] = { formFieldIds: {} };
        }
        newControlValues[index][field] = value;
        if (fieldId) {
            newControlValues[index].formFieldIds[field] = fieldId;
        }
        setControlValues(newControlValues);
        onControlValuesChange(newControlValues);
    };

    const addControl = () => {
        setDialogOpen(true);
        // setControls([...controls, controls.length]);
    };
    const handleDialogClose = (confirmed: boolean) => {
        setDialogOpen(false);
    }

    const removeControl = async (index: number) => {
        setControls(controls.filter((_, i) => i !== index));
        setControlValues(controlValues.filter((_, i) => i !== index));
        onControlValuesChange(controlValues.filter((_, i) => i !== index));
    }

    const renderControls = (index: number) => (
        <OreGradeControl
            key={index}
            index={index}
            controlValues={controlValues}
            handleInputChange={handleControlChange}
            removeControl={removeControl}
            validated={false} />
    );

    return (
        <div>
            {controls.length < 0 && controls.map((_, index) => renderControls(index))}
            <Box mt={2} mb={6}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={addControl}
                >
                    {caption ? caption : "Add Ore"}
                </Button>
            </Box>
            <AlertDialogSlide
                open={dialogOpen}
                handleClose={handleDialogClose}
                text="Contact Stormlands to add more."
            />
        </div>
    );
};

export default SelectControl;
