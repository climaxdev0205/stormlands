import React, { useState, useEffect } from 'react';
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { UpdateStepInput, UpdateSubStepInput } from 'src/API';
import { updateStep, updateSubStep } from 'src/graphql/mutations';
import { getVersion } from 'src/graphql/queries';
import { GetVersionQuery, GetVersionQueryVariables } from 'src/API';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import ProjectContent from '@components/project/ProjectContent';
import { Modal } from '@components/ui';

async function updateStepStatus(stepId: string, isCompleted: boolean) {
    const input: UpdateStepInput = {
        id: stepId,
        isCompleted,
    };
    try {
        const response = await API.graphql({
            query: updateStep,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        console.log('Step successfully updated:', response);
    } catch (error) {
        console.error('Error updating Step:', error);
    }
}

async function updateSubStepStatus(subStepId: string, isCompleted: boolean) {
    const input: UpdateSubStepInput = {
        id: subStepId,
        isCompleted,
    };
    try {
        const response = await API.graphql({
            query: updateSubStep,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        console.log('SubStep successfully updated:', response);
    } catch (error) {
        console.error('Error updating SubStep:', error);
    }
}

function handleSubStepCompleted(subStepId: string) {
    updateSubStepStatus(subStepId, true);
}

export const listSubStepsByStep = /* GraphQL */ `
  query ListSubStepsByStep($stepID: ID!, $nextToken: String, $formFieldsNextToken: String) {
    listSubSteps(filter: { stepID: { eq: $stepID } }, nextToken: $nextToken) {
      items {
        id
        label
        sortOrder
        isCompleted
        formFields(nextToken: $formFieldsNextToken) {
          items {
            id
            key
            value
            fieldType
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;

const processCompletedSteps = (stepsData: StepData[]) => {
    const completedSteps: Record<number, number[]> = {};

    stepsData.forEach((step, stepIndex) => {
        let completedSubSteps: number[] = [];
        let allSubStepsCompleted = true;

        step.subSteps.forEach((subStep, subStepIndex) => {
            if (subStep.isCompleted) {
                completedSubSteps.push(subStepIndex);
            } else {
                allSubStepsCompleted = false;
            }
        });

        if (allSubStepsCompleted) {
            completedSteps[stepIndex] = completedSubSteps;
            // Update the step's isCompleted status
            updateStepStatus(step.id, true);
        }
    });

    return completedSteps;
};



interface StepData {
    id: string;
    label: string;
    isCompleted: boolean;
    sortOrder: number;
    subSteps: {
        id: string;
        label: string;
        sortOrder: number;
        isCompleted: boolean;
    }[];
}

interface MyStepperProps {
    linear?: boolean;
    versionId: string;
    onBack: () => void;
}

const MyStepper: React.FC<MyStepperProps> = ({ versionId, linear = false, onBack }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [activeSubStep, setActiveSubStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Record<number, number[]>>({});
    const [stepsData, setStepsData] = useState<StepData[]>([]);

    async function fetchSubSteps(stepID: string, nextToken: string | null = null): Promise<any[]> {
        const subStepsResult = (await API.graphql({
            query: listSubStepsByStep,
            variables: { stepID, nextToken, limit: 1000 },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<{ listSubSteps: { items: any[]; nextToken: string | null } }>;

        const subSteps = subStepsResult.data?.listSubSteps.items || [];
        const newNextToken = subStepsResult.data?.listSubSteps.nextToken;

        if (newNextToken) {
            return subSteps.concat(await fetchSubSteps(stepID, newNextToken));
        }

        return subSteps;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const result = (await API.graphql({
                    query: getVersion,
                    variables: { id: versionId },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                })) as GraphQLResult<GetVersionQuery>;

                if (result.data && result.data.getVersion && result.data.getVersion.steps) {
                    const fetchedStepsPromises = result.data.getVersion.steps.items.map(async (step) => {
                        if (!step) return null;
                        const subSteps = await fetchSubSteps(step.id);

                        return {
                            id: step.id,
                            label: step.label,
                            sortOrder: step.sortOrder,
                            isCompleted: step.isCompleted,
                            subSteps,
                        };
                    });

                    const fetchedSteps = (await Promise.all(fetchedStepsPromises)).filter(Boolean) as {
                        id: string;
                        isCompleted: boolean;
                        label: string;
                        sortOrder: number;
                        subSteps: any[];
                    }[];

                    const processedSteps: StepData[] = fetchedSteps
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((step) => ({
                            id: step.id,
                            label: step.label,
                            sortOrder: step.sortOrder,
                            isCompleted: step.isCompleted,
                            subSteps: step.subSteps
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((subStep) => ({
                                    id: subStep.id,
                                    label: subStep.label,
                                    sortOrder: subStep.sortOrder,
                                    isCompleted: subStep.isCompleted,
                                    formFields: subStep.formFields.items, // Add formFields here
                                })),
                        }));
                        console.log('processedSteps', processedSteps);
                        setStepsData(processedSteps);
                        setCompletedSteps(processCompletedSteps(processedSteps));
                }
            } catch (error) {
                console.error('Error fetching steps data:', error);
            }
        }
        fetchData();
    }, []);

    const onActiveSubStepChange = (newActiveSubStep: number) => {
        setActiveSubStep(newActiveSubStep);
    };

    const isLastStep = () => activeStep === stepsData.length - 1;
    const isLastSubStep = () => activeSubStep === stepsData[activeStep].subSteps.length - 1;

    const isStepCompleted = (stepIndex: number) => {
        return stepsData[stepIndex].isCompleted;
    }

    const isSubStepCompleted = (stepIndex: number, subStepIndex: number) => {
        if (stepIndex < stepsData.length && subStepIndex < stepsData[stepIndex].subSteps.length) {
            return stepsData[stepIndex].subSteps[subStepIndex].isCompleted as boolean;
        }
        else {
            return true;
        }
    }

    const completeSubStep = (stepIndex: number, subStepIndex: number) => {
        console.log('completeSubStep', stepIndex, subStepIndex);
        setCompletedSteps((prevCompletedSteps) => {
            const updatedSubSteps = [...(prevCompletedSteps[stepIndex] || [])];
            if (!updatedSubSteps.includes(subStepIndex)) {
                updatedSubSteps.push(subStepIndex);
            }
            return {
                ...prevCompletedSteps,
                [stepIndex]: updatedSubSteps.sort(),
            };
        });
        handleSubStepCompleted(stepsData[stepIndex].subSteps[subStepIndex].id);

    // Update stepsData state with the new substep completion status
    setStepsData((prevStepsData) => {
        const updatedStepsData = [...prevStepsData];
        updatedStepsData[stepIndex].subSteps[subStepIndex].isCompleted = true;

        return updatedStepsData;
    });

        // Check if all substeps are completed and update the step's isCompleted status
        const currentCompletedSubSteps = completedSteps[stepIndex] ? [...completedSteps[stepIndex], subStepIndex] : [subStepIndex];
        if (
            currentCompletedSubSteps.length === stepsData[stepIndex].subSteps.length &&
            stepsData[stepIndex].id
        ) {
            console.log("Updating step status for stepId:", stepsData[stepIndex].id);
            updateStepStatus(stepsData[stepIndex].id, true);

            setStepsData((prevStepsData) => {
                const updatedStepsData = [...prevStepsData];
                updatedStepsData[stepIndex].isCompleted = true;
    
                return updatedStepsData;
            });
        }

        handleNext();
    };

    const handleStepClick = (stepIndex: number) => {
        if (!linear) {
            setActiveStep(stepIndex);
            setActiveSubStep(0);
        }
    };

    const findNextAvailableSubStep = (stepIndex: number, subStepIndex: number) => {
        let nextStepIndex = stepIndex;
        let nextSubStepIndex = subStepIndex + 1;
    
        while (nextStepIndex < stepsData.length) {
            if (nextSubStepIndex < stepsData[nextStepIndex].subSteps.length) {
                return { nextStepIndex, nextSubStepIndex };
            } else {
                nextStepIndex++;
                nextSubStepIndex = 0;
            }
        }
    
        return { nextStepIndex: -1, nextSubStepIndex: -1 };
    };

    const handleNext = () => {
        const { nextStepIndex, nextSubStepIndex } = findNextAvailableSubStep(activeStep, activeSubStep);
        if (nextStepIndex === -1 && nextSubStepIndex === -1) {
            // All steps and substeps have been processed.
            return;
        }
        setActiveStep(nextStepIndex);
        setActiveSubStep(nextSubStepIndex);
        onActiveSubStepChange(nextSubStepIndex);
    };
    
    const findPrevAvailableSubStep = (stepIndex: number, subStepIndex: number) => {
        let prevStepIndex = stepIndex;
        let prevSubStepIndex = subStepIndex - 1;
    
        while (prevStepIndex >= 0) {
            if (prevSubStepIndex >= 0) {
                return { prevStepIndex, prevSubStepIndex };
            } else {
                prevStepIndex--;
                if (prevStepIndex >= 0) {
                    prevSubStepIndex = stepsData[prevStepIndex].subSteps.length - 1;
                }
            }
        }
    
        return { prevStepIndex: -1, prevSubStepIndex: -1 };
    };
    
    const handleBack = () => {
        const { prevStepIndex, prevSubStepIndex } = findPrevAvailableSubStep(activeStep, activeSubStep);
        if (prevStepIndex === -1 && prevSubStepIndex === -1) {
            onBack();
            return;
        }
        setActiveStep(prevStepIndex);
        setActiveSubStep(prevSubStepIndex);
    };
    
    return (
        <Box sx={{ width: '100%', height: '90%' }} >
            <Stepper nonLinear={!linear} activeStep={activeStep}>
                {stepsData.map((step, index) => (
                    <Step key={step.label} completed={isStepCompleted(index)}>
                        <StepLabel
                            onClick={() => handleStepClick(index)}
                        >
                            {step.label}
                            {index === 2 && step.subSteps.length === 0 && (
                                <Box mt={1}>
                                    <Typography variant="caption" color="error">
                                        Please add a Concentrate Production
                                    </Typography>
                                </Box>
                            )}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div className={"flex flex-col h-[700px] mt-2 mb-1 py-1 w-full"} >
                    {
                        stepsData.length > 0 && (
                            <Modal title={stepsData[activeStep].label} >
                                <Box
                                    sx={{
                                        flexGrow: 1, bgcolor: 'background.paper',
                                        display: 'flex', height: 'auto', minHeight: '650px',
                                        width: 'full',

                                    }}
                                    className="stormShadowNoTop"
                                >
                                    {/* Either fetch project and version here or in Parent/Child component */}

                                    <ProjectContent
                                        projectID={'1'}
                                        activeStep={activeStep}
                                        activeSubStep={activeSubStep}
                                        stepsData={stepsData}
                                        onActiveSubStepChange={setActiveSubStep}
                                        isSubStepCompleted={isSubStepCompleted}
                                        handleBack={handleBack}
                                        handleNext={handleNext}
                                        isLastStep={isLastStep}
                                        isLastSubStep={isLastSubStep}
                                        linear={linear}
                                        completeSubStep={completeSubStep}
                                    />
                                </Box>
                            </Modal>
                        )
                    }
                </div>
            </div>
        </Box>
    );
};

export default MyStepper;
