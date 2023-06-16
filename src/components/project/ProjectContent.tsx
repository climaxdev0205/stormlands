import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { Breadcrumbs } from "@components/ui";

import MineResources from "src/components/project/mine/MineResources";
import MineClassification from "src/components/project/mine/MineClassification";
import MiningAndMilling from "src/components/project/mine/MiningAndMilling";

import ConcentrateProduction from "src/components/project/production/ConcentrateProduction";
import Concentrate from "src/components/project/production/Concentrate";

import PayablesZinc from "@components/project/revenue/PayablesZinc";
import PayablesLead from "@components/project/revenue/PayablesLead";
import PriceZinc from "@components/project/revenue/PriceZinc";
import PriceLead from "@components/project/revenue/PriceLead";
import PriceQuoteZinc from "@components/project/revenue/PriceQuoteZinc";
import PriceQuoteLead from "@components/project/revenue/PriceQuoteLead";
import PriceTypeLead from "@components/project/revenue/PriceTypeLead";
import PriceTypeZinc from "@components/project/revenue/PriceTypeZinc";
import QuotationalPeriod from './revenue/QuotationalPeriod';

import TreatmentChargeZinc from "@components/project/revenue/TreatmentChargeZinc";
import TreatmentChargeLead from "@components/project/revenue/TreatmentChargeLead";
import RefiningChargeZinc from './revenue/RefiningChargeZinc';
import RefiningChargeLead from './revenue/RefiningChargeLead';
import PenaltiesZinc from './revenue/PenaltiesZinc';
import PenaltiesLead from './revenue/PenaltiesLead';
import LogisticsZinc from "src/components/project/revenue/LogisticsZinc";
import LogisticsLead from "src/components/project/revenue/LogisticsLead";

import Capex from "src/components/project/expenditure/Capex";
import Overheads from "src/components/project/expenditure/Overheads";
import Operating from "src/components/project/expenditure/Operating";
import WorkingCapital from "src/components/project/expenditure/WorkingCapital";
import EnvironmentalProduction from "src/components/project/expenditure/EnvironmentalProduction";
import EnvironmentalClosure from "src/components/project/expenditure/EnvironmentalClosure";

import Depreciation from "src/components/project/financial/Depreciation";
import TaxAndRoyalty from "src/components/project/financial/TaxAndRoyalty";
import FinancialRates from "src/components/project/financial/FinancialRates";

import SuccessPage from './SuccessPage';

import { FormField } from 'src/API';
import { API } from 'aws-amplify';
import { updateFormField } from 'src/graphql/mutations';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/auth';


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: React.CSSProperties;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            className='w-full p-4 h-full'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface StepData {
    label: string;
    subSteps: {
        id: string;
        label: string;
        sortOrder: number;
        isCompleted: boolean;
        formFields?: FormField[];
    }[];
}

interface Props {
    projectID: string;
    activeStep: number;
    activeSubStep: number;
    stepsData: StepData[];
    onActiveSubStepChange: (newActiveSubStep: number) => void;
    isSubStepCompleted: (stepIndex: number, subStepIndex: number) => boolean;
    handleBack: () => void;
    handleNext: () => void;
    isLastStep: () => boolean;
    isLastSubStep: () => boolean;
    linear: boolean;
    completeSubStep: (stepIndex: number, subStepIndex: number) => void;
}

const ProjectContent: React.FC<Props> = ({
    projectID,
    activeStep,
    activeSubStep,
    stepsData,
    onActiveSubStepChange,
    isSubStepCompleted,
    handleBack,
    handleNext,
    isLastStep,
    isLastSubStep,
    linear,
    completeSubStep,
}) => {
    const pageName = stepsData[activeStep].label;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log('handleChange', newValue);
        onActiveSubStepChange(newValue);
    };

    const saveDataToDatabase = (formFieldsState: FormField[], subStepId: string) => {
        // Save the formFieldsState to the database using graphql
        console.log('Saving data:', subStepId, formFieldsState);
        saveFormField(formFieldsState, subStepId);
        console.log('Saved data:', subStepId, formFieldsState);
    };

    //call this function for static fields
    const saveFormField = async (formFieldsState: FormField[], subStepId: string
    ) => {
        //update all the form fields for the given SubStep to the database
        //Update form fields
        for (const field of formFieldsState || []) {
            await API.graphql({
                query: updateFormField,
                variables: {
                    input: {
                        id: field.id,
                        key: field.key,
                        value: field.value,
                        fieldType: field.fieldType,
                        subStepID: subStepId,
                    },
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            });
        }
    }

    const validateForm = (formFieldsState: FormField[], requiredFields: string[]) => {
        console.log("Validating data:", formFieldsState);
        return requiredFields.every((field) => {
            const fieldValue = formFieldsState.find((formField) => formField.key === field);

            // Check if fieldValue is not null or undefined and the field value is a non-empty string or a number greater than 0
            return fieldValue && ((typeof fieldValue.value === 'string' && fieldValue.value.trim() !== '') || (parseFloat(fieldValue.value) > 0));
        });
    };


    const renderContent = (stepIndex: number, subStepIndex: number) => {
        // console.log('subStepIndex', subStepIndex);
        // if (isLastStep() && isLastSubStep()) {
        //   return (
        //     <SuccessPage
        //     data={stepsData[activeStep].subSteps[activeSubStep]}
        //     onSave={saveDataToDatabase}
        //     activeStep={activeStep}
        //     activeSubStep={activeSubStep}
        //     isSubStepCompleted={isSubStepCompleted}
        //     handleBack={handleBack}
        //     handleNext={handleNext}
        //     isLastStep={isLastStep}
        //     isLastSubStep={isLastSubStep}
        //     linear={linear}
        //     completeSubStep={completeSubStep}
        //     onValidate={validateForm}
        //     
        //   />
        //   );
        // }
        if (stepIndex === 0) {
            if (subStepIndex === 0) return (
                <MineResources
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}
                />
            );
            if (subStepIndex === 1) return (
                <MineClassification
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}
                />);
            if (subStepIndex === 2) return (
                <MiningAndMilling
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}
                />);
        }
        if (stepIndex === 1) {
            if (subStepIndex === 0) return (
                <ConcentrateProduction
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}
                />);
            if (subStepIndex === 1) return (
                <Concentrate
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
        }
        if (stepIndex === 2) {
            if (subStepIndex === 0) return (
                <PayablesZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 1) return (
                <PriceTypeZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 2) return (
                <PriceZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 3) return (
                <PriceQuoteZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 4) return (
                <QuotationalPeriod
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 5) return (
                <TreatmentChargeZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 6) return (
                <RefiningChargeZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 7) return (
                <PenaltiesZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 8) return (
                <LogisticsZinc
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 9) return (
                <PayablesLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 10) return (
                <PriceTypeLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 11) return (
                <PriceLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 12) return (
                <PriceQuoteLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 13) return (
                <QuotationalPeriod
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 14) return (
                <TreatmentChargeLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 15) return (
                <RefiningChargeLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 16) return (
                <PenaltiesLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
            if (subStepIndex === 17) return (
                <LogisticsLead
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />
            );
        }
        if (stepIndex === 3) {
            if (subStepIndex === 0) return (
                <Capex
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 1) return (
                <Overheads
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 2) return (
                <Operating
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 3) return (
                <WorkingCapital
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 4) return (
                <EnvironmentalProduction
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 5) return (
                <EnvironmentalClosure
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
        }
        if (stepIndex === 4) {
            if (subStepIndex === 0) return (
                <Depreciation
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 1) return (
                <TaxAndRoyalty
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
            if (subStepIndex === 2) return (
                <FinancialRates
                    data={stepsData[activeStep].subSteps[activeSubStep]}
                    onSave={saveDataToDatabase}
                    activeStep={activeStep}
                    activeSubStep={activeSubStep}
                    isSubStepCompleted={isSubStepCompleted}
                    handleBack={handleBack}
                    handleNext={handleNext}
                    isLastStep={isLastStep}
                    isLastSubStep={isLastSubStep}
                    linear={linear}
                    completeSubStep={completeSubStep}
                    onValidate={validateForm}

                />);
        }
    };
    if (activeStep === 2) return (
        <>
            {/* loop thru the products */}
            <Stack direction="column" spacing={2}>
                <Accordion expanded={activeSubStep < 9}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        onClick={() => onActiveSubStepChange(0)}
                    >
                        <Typography>Zinc</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {activeSubStep < 9 && (
                            <Tabs
                                orientation="vertical"
                                value={activeSubStep}
                                onChange={handleChange}
                                aria-label="SideNav"
                                sx={{ borderRight: 1, borderColor: "divider", minWidth: "275px" }}
                            >
                                {stepsData[activeStep].subSteps.slice(0, 9).map((subStep, subStepIndex) => (
                                    <Tab
                                        key={subStepIndex}
                                        label={
                                            <div className="flex items-center w-full text-left">
                                                <span className='w-full'>{subStep.label}
                                                    {isSubStepCompleted(activeStep, subStepIndex) && (
                                                        <CheckCircleOutlineIcon color='success' sx={{ float: 'right' }} />
                                                    )}
                                                </span>
                                            </div>
                                        }
                                        {...a11yProps(subStepIndex)}
                                        sx={{ alignItems: "start" }}
                                    />
                                ))}
                            </Tabs>
                        )}
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={activeSubStep >= 9}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        onClick={() => onActiveSubStepChange(9)}
                    >
                        <Typography>Lead</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {activeSubStep >= 9 && (
                            <Tabs
                                orientation="vertical"
                                value={Math.max(0, activeSubStep - 9)}
                                onChange={(event, newValue) => handleChange(event, newValue + 9)}
                                aria-label="SideNav"
                                sx={{ borderRight: 1, borderColor: "divider", minWidth: "275px" }}
                            >
                                {stepsData[activeStep].subSteps.slice(9).map((subStep, subStepIndex) => (
                                    <Tab
                                        key={subStepIndex + 9}
                                        label={
                                            <div className="flex items-center w-full text-left">
                                                <span className='w-full'>{subStep.label}
                                                    {isSubStepCompleted(activeStep, subStepIndex + 9) && (
                                                        <CheckCircleOutlineIcon color='success' sx={{ float: 'right' }} />
                                                    )}
                                                </span>
                                            </div>
                                        }
                                        {...a11yProps(subStepIndex + 9)}
                                        sx={{ alignItems: "start" }}
                                    />
                                ))}
                            </Tabs>
                        )}
                    </AccordionDetails>
                </Accordion>
            </Stack>
            <TabPanel value={activeSubStep} index={activeSubStep} style={{ overflowY: "auto" }}>
                <Breadcrumbs
                    list={[{ name: pageName }, { name: stepsData[activeStep].subSteps[activeSubStep].label }]}
                ></Breadcrumbs>
                {renderContent(activeStep, activeSubStep)}
            </TabPanel>
        </>
    );
    return (
        <>
            <Tabs
                orientation="vertical"
                value={activeSubStep}
                onChange={handleChange}
                aria-label="SideNav"
                sx={{ borderRight: 1, borderColor: "divider", minWidth: "275px" }}
            >
                {stepsData[activeStep].subSteps.map((subStep, subStepIndex) => (
                    <Tab
                        key={subStepIndex}
                        label={
                            <div className="flex items-center w-full text-left">
                                <span className='w-full'>{subStep.label}
                                    {isSubStepCompleted(activeStep, subStepIndex) && (
                                        <CheckCircleOutlineIcon color='success' sx={{ float: 'right' }} />
                                    )}
                                </span>
                            </div>
                        }
                        {...a11yProps(subStepIndex)}
                        sx={{ alignItems: "start" }}
                    />
                ))}
            </Tabs>
            <TabPanel value={activeSubStep} index={activeSubStep} style={{ overflowY: "auto" }}>
                <div style={{ paddingBottom: 30, marginTop: -30 }}>
                    <Breadcrumbs
                        list={[{ name: pageName }, { name: stepsData[activeStep].subSteps[activeSubStep].label }]}
                    ></Breadcrumbs>
                </div>
                {renderContent(activeStep, activeSubStep)}
            </TabPanel>
        </>
    );
}

export default ProjectContent;