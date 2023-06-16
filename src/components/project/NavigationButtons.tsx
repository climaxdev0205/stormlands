import React from 'react';
import { Box, Button } from '@mui/material';

interface NavigationButtonsProps {
    activeStep: number;
    activeSubStep: number;
    isSubStepCompleted: (stepIndex: number, subStepIndex: number) => boolean;
    linear: boolean;
    handleBack: () => void;
    handleNext: () => void;
    isLastStep: () => boolean;
    isLastSubStep: () => boolean;
    validateForm: () => boolean;
    completeSubStepWithoutMoving: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    activeStep,
    activeSubStep,
    isSubStepCompleted,
    linear,
    handleBack,
    handleNext,
    isLastStep,
    isLastSubStep,
    validateForm,
    completeSubStepWithoutMoving,
}) => {

    const handleNextWithValidation = () => {
        if (isLastStep() && isLastSubStep() && validateForm()) {
            completeSubStepWithoutMoving();
        }
        if (validateForm()) {
            console.log('form is valid');
            completeSubStepWithoutMoving();
            handleNext();
        } else {
            console.log('form is not valid');
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            position: 'sticky',
        }}
        >
            <Button
                variant="contained"
                disabled={linear && (activeStep === 0 && activeSubStep === 0)}
                onClick={handleBack}
                sx={{ mr: 3, backgroundColor: '#3283af', color: 'white' }}
            >
                Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
                variant="contained"
                color="primary"
                onClick={handleNextWithValidation}>
                {isLastStep() && isLastSubStep() ? 'Save Project' : 'Next'}
            </Button>
        </Box>
    );
};

export default NavigationButtons;