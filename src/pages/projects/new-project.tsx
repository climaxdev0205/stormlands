import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { CreateProjectMutation, CreateStepMutation, CreateVersionMutation, CreateSubStepMutation, CreateFormFieldMutation } from "../../API";
import { API } from "aws-amplify";
import { createProject, createVersion, createStep, createSubStep, createFormField } from "../../graphql/mutations";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Modal } from "@components/ui";
import ProjectCreate from "@components/project/ProjectCreate/ProjectCreate";
import { useUser } from "src/context/AuthContext";
import dayjs from "dayjs";

export type ProjectData = {
  name: string,
  location: string,
  date: string
}

type FooterProps = {
  projectName: string;
  projectLocation: string;
  projectDate: string;
};

export type VersionData = {
  version: string,
  time: string,
  date: string,
  npv: number,
}

export type StepData = {
  label: string,
  isCompleted?: boolean,
  sortOrder?: number,
  subSteps: {
    label: string,
    sortOrder?: number,
    isCompleted?: boolean,
    formFields?: {
      key: string,
      value: string,
      fieldType: string,
    }[];
  }[];
}

const CreateNewProject: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLocation, setProjectLocation] = useState('');
  const [projectDate, setProjectDate] = useState('');

  const handleDataChange = (data: ProjectData) => {

    const formattedDate = dayjs(data.date).format("MM/DD/YYYY:HH:mm:ss");
    const version = data.name + ' ' + formattedDate;

    setProjectName(version);
    setProjectLocation(data.location);
    setProjectDate(formattedDate);
  };

  const storeProject = async (data: ProjectData) => {
    const { name, location, date } = data;

    const stepsData: StepData[] = [
      {
        label: 'Mine',
        sortOrder: 1,
        isCompleted: false,
        subSteps: [
          {
            label: 'Mine Resources', sortOrder: 1, isCompleted: false,
            formFields: [
              { key: 'MR_LeadResources', value: '', fieldType: 'input' },
              { key: 'MR_ZincResources', value: '', fieldType: 'input' },
              { key: 'MR_SilverResources', value: '', fieldType: 'input' },
              { key: 'MR_GoldResources', value: '', fieldType: 'input' },
              { key: 'MR_MineResources', value: '', fieldType: 'input' },
              { key: 'MR_SpecificGravity', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Mineral Classification', sortOrder: 2, isCompleted: false,
            formFields: [
              { key: 'MC_MineResources', value: '', fieldType: 'radio' },
              { key: 'MC_MineralReserves', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Mining & Milling', sortOrder: 3, isCompleted: false,
            formFields: [
              { key: 'MM_DaysYear', value: '', fieldType: 'input' },
              { key: 'MM_DailyProduction', value: '', fieldType: 'input' },
              { key: 'MM_RampUp', value: 'false', fieldType: 'radio' },
              { key: 'MM_Year1', value: '', fieldType: 'select' },
              { key: 'MM_Year2', value: '', fieldType: 'select' },
              { key: 'MM_Year3', value: '', fieldType: 'select' },
              { key: 'MM_MineDilution', value: '', fieldType: 'input' },
              { key: 'MM_MineRecovery', value: '', fieldType: 'input' },
              { key: 'MM_MillRecovery', value: '', fieldType: 'input' },
            ]
          },
        ],
      },
      {
        label: 'Production',
        sortOrder: 2,
        isCompleted: false,
        subSteps: [
          {
            label: 'Concentrate Production', sortOrder: 1, isCompleted: false,
            formFields: [
              { key: 'P_PC_ZincAnnualProd', value: '', fieldType: 'select' },
              { key: 'P_PC_LeadAnnualProd', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Concentrate', sortOrder: 2, isCompleted: false,
            formFields: [
              { key: 'C_ZC_Zn', value: '', fieldType: 'input' },
              { key: 'C_ZC_H20', value: '', fieldType: 'input' },
              { key: 'C_ZC_Ag', value: '', fieldType: 'input' },
              { key: 'C_ZC_Au', value: '', fieldType: 'input' },
              { key: 'C_ZC_Pb', value: '', fieldType: 'input' },
              { key: 'C_ZC_Cu', value: '', fieldType: 'input' },
              { key: 'C_ZC_Fe', value: '', fieldType: 'input' },
              { key: 'C_ZC_Si02', value: '', fieldType: 'input' },
              { key: 'C_ZC_As', value: '', fieldType: 'input' },
              { key: 'C_PB_Zn', value: '', fieldType: 'input' },
              { key: 'C_PB_H20', value: '', fieldType: 'input' },
              { key: 'C_PB_Ag', value: '', fieldType: 'input' },
              { key: 'C_PB_Au', value: '', fieldType: 'input' },
              { key: 'C_PB_Pb', value: '', fieldType: 'input' },
              { key: 'C_PB_Cu', value: '', fieldType: 'input' },
              { key: 'C_PB_Fe', value: '', fieldType: 'input' },
              { key: 'C_PB_Si02', value: '', fieldType: 'input' },
              { key: 'C_PB_As', value: '', fieldType: 'input' },
              { key: 'C_Add_Element', value: '', fieldType: 'select' },
              { key: 'C_Add_Value', value: '', fieldType: 'input' },
            ]
          },
        ],
      },
      {
        label: 'Revenue',
        sortOrder: 3,
        isCompleted: false,
        subSteps: [
          {
            label: 'Payables', sortOrder: 1, isCompleted: false,
            formFields: [
              { key: 'Payables_Z_Payable', value: '', fieldType: 'input' },
              { key: 'Payables_Z_PayPercentage', value: '', fieldType: 'input' },
              { key: 'Payables_Z_Subject', value: '', fieldType: 'radio' },
              { key: 'Payables_Z_Deductions', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Price Type', sortOrder: 2, isCompleted: false,
            formFields: [
              { key: 'Price_Z_PriceType_Historical_From', value: '', fieldType: 'date' },
              { key: 'Price_Z_PriceType_Historical_To', value: '', fieldType: 'date' },
              { key: 'Price_Z_PriceType_Future_From', value: '', fieldType: 'date' },
              { key: 'Price_Z_PriceType_Future_To', value: '', fieldType: 'date' },
              { key: 'Price_Z_PriceType_Fixed_Select', value: '', fieldType: 'select' },
              { key: 'Price_Z_PriceType_Fixed_VolType', value: '', fieldType: 'radio' },
              { key: 'Price_Z_PriceType_Trending_Select', value: '', fieldType: 'select' },
              { key: 'Price_Z_PriceType_Trending_BasicPrice', value: '', fieldType: 'select' },
              { key: 'Price_Z_PriceType_Trending_Return', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Price', sortOrder: 3, isCompleted: false,
            formFields: [
              { key: 'Price_Z_Price', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Price Quote', sortOrder: 4, isCompleted: false,
            formFields: [
              { key: 'PriceQuote_Z_PriceQuote', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Quotational Period', sortOrder: 5, isCompleted: false,
          },
          {
            label: 'Treatment Charge', sortOrder: 6, isCompleted: false,
            formFields: [
              { key: 'TC_Z_TotalTreatmentCharge', value: '', fieldType: 'input' },
              { key: 'TC_Z_PriceParticipation', value: '', fieldType: 'radio' },
              { key: 'TC_Z_BasisPrice', value: '', fieldType: 'input' },
              { key: 'TC_Z_Down', value: '', fieldType: 'select' },
              { key: 'TC_Z_Up', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Refining Charge', sortOrder: 7, isCompleted: false,
            formFields: [
              { key: 'RC_Z_Charge', value: '', fieldType: 'select' },
              { key: 'RC_Z_Value', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Penalties (Optional)', sortOrder: 8, isCompleted: false,
            formFields: [
              { key: 'Penalties_Z_Element', value: '', fieldType: 'select' },
              { key: 'Penalties_Z_Charge', value: '', fieldType: 'input' },
              { key: 'Penalties_Z_Each', value: '', fieldType: 'input' },
              { key: 'Penalties_Z_Above', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Logistics', sortOrder: 9, isCompleted: false,
            formFields: [
              { key: 'Logistics_Z_Logistics', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Payables', sortOrder: 10, isCompleted: false,
            formFields: [
              { key: 'Payables_L_Payable', value: '', fieldType: 'input' },
              { key: 'Payables_L_PayPercentage', value: '', fieldType: 'input' },
              { key: 'Payables_L_Subject', value: '', fieldType: 'radio' },
              { key: 'Payables_L_Deductions', value: '', fieldType: 'input' },
              // { key: 'Payables_S_Payable', value: '', fieldType: 'input' },
              // { key: 'Payables_S_PayPercentage', value: '', fieldType: 'input' },
              // { key: 'Payables_S_Subject', value: '', fieldType: 'radio' },
              // { key: 'Payables_S_Deductions', value: '', fieldType: 'input' },
              // { key: 'Payables_G_Payable', value: '', fieldType: 'input' },
              // { key: 'Payables_G_PayPercentage', value: '', fieldType: 'input' },
              // { key: 'Payables_G_Subject', value: '', fieldType: 'radio' },
              // { key: 'Payables_G_Deductions', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Price Type', sortOrder: 11, isCompleted: false,
            formFields: [
              { key: 'Price_L_PriceType_Historical_From', value: '', fieldType: 'date' },
              { key: 'Price_L_PriceType_Historical_To', value: '', fieldType: 'date' },
              { key: 'Price_L_PriceType_Future_From', value: '', fieldType: 'date' },
              { key: 'Price_L_PriceType_Future_To', value: '', fieldType: 'date' },
              { key: 'Price_L_PriceType_Fixed_Select', value: '', fieldType: 'select' },
              { key: 'Price_L_PriceType_Fixed_VolType', value: '', fieldType: 'radio' },
              { key: 'Price_L_PriceType_Trending_Select', value: '', fieldType: 'select' },
              { key: 'Price_L_PriceType_Trending_BasicPrice', value: '', fieldType: 'select' },
              { key: 'Price_L_PriceType_Trending_Return', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Price', sortOrder: 12, isCompleted: false,
            formFields: [
              { key: 'Price_L_Price', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Price Quote', sortOrder: 13, isCompleted: false,
            formFields: [
              { key: 'PriceQuote_L_PriceQuote', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Quotational Period', sortOrder: 14, isCompleted: false,
          },
          {
            label: 'Treatment Charge', sortOrder: 15, isCompleted: false,
            formFields: [
              { key: 'TC_L_TotalTreatmentCharge', value: '', fieldType: 'input' },
              { key: 'TC_L_PriceParticipation', value: '', fieldType: 'radio' },
              { key: 'TC_L_BasisPrice', value: '', fieldType: 'input' },
              { key: 'TC_L_Down', value: '', fieldType: 'select' },
              { key: 'TC_L_Up', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Refining Charge', sortOrder: 16, isCompleted: false,
            formFields: [
              { key: 'RC_L_Charge', value: '', fieldType: 'select' },
              { key: 'RC_L_Value', value: '', fieldType: 'select' },
            ]
          },
          {
            label: 'Penalties (Optional)', sortOrder: 17, isCompleted: false,
            formFields: [
              { key: 'Penalties_L_Element', value: '', fieldType: 'select' },
              { key: 'Penalties_L_Charge', value: '', fieldType: 'input' },
              { key: 'Penalties_L_Each', value: '', fieldType: 'input' },
              { key: 'Penalties_L_Above', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Logistics', sortOrder: 18, isCompleted: false,
            formFields: [
              { key: 'Logistics_L_Logistics', value: '', fieldType: 'input' },
            ]
          },
        ],
      },
      {
        label: 'Expenditure',
        sortOrder: 4,
        isCompleted: false,
        subSteps: [
          {
            label: 'Capex', sortOrder: 1, isCompleted: false,
            formFields: [
              { key: 'Capex_ConstructionPeriod', value: '', fieldType: 'input' },
              { key: 'Capex_Mine_Year1', value: '', fieldType: 'input' },
              { key: 'Capex_Mine_Year2', value: '', fieldType: 'input' },
              { key: 'Capex_OreTreatment_Year1', value: '', fieldType: 'input' },
              { key: 'Capex_OreTreatment_Year2', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Overheads', sortOrder: 2, isCompleted: false,
            formFields: [
              { key: 'Over_Overheads', value: '', fieldType: 'radio' },
              { key: 'Over_Overheads_Percentage', value: '', fieldType: 'input' },
              { key: 'Over_Overheads_Amount', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Operating', sortOrder: 3, isCompleted: false,
            formFields: [
              { key: 'Oper_Operating', value: '', fieldType: 'radio' },
              { key: 'Oper_TotalCapex', value: '', fieldType: 'input' },
              { key: 'Oper_FixedAmount', value: '', fieldType: 'input' },
              { key: 'Oper_OperatingMining', value: '', fieldType: 'input' },
              { key: 'Oper_OperatingMilling', value: '', fieldType: 'input' },
              { key: 'Oper_OperatingProcessing', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Working Capital', sortOrder: 4, isCompleted: false,
            formFields: [
              { key: 'WC_WorkingCapital', value: '', fieldType: 'radio' },
              { key: 'WC_Capex', value: '', fieldType: 'input' },
              { key: 'WC_Fixed', value: '', fieldType: 'input' },
              { key: 'WC_TOC', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Environmental/Production', sortOrder: 5, isCompleted: false,
            formFields: [
              { key: 'E_Production', value: '', fieldType: 'radio' },
              { key: 'E_Production_Capex', value: '', fieldType: 'input' },
              { key: 'E_Production_Fixed', value: '', fieldType: 'select' },
              { key: 'E_ProductionValue', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Environmental/Closure', sortOrder: 6, isCompleted: false,
            formFields: [
              { key: 'E_Closure_Lump', value: '', fieldType: 'radio' },
              { key: 'E_Closure_Lump_TOC', value: '', fieldType: 'input' },
              { key: 'E_Closure_Lump_Capex', value: '', fieldType: 'select' },
              { key: 'E_Closure_Lump_Fixed', value: '', fieldType: 'select' },
              { key: 'E_Closure_Sink', value: '', fieldType: 'radio' },
              { key: 'E_Closure_Sink_TOC', value: '', fieldType: 'input' },
              { key: 'E_Closure_Sink_Capex', value: '', fieldType: 'select' },
              { key: 'E_Closure_Sink_Fixed', value: '', fieldType: 'select' },
              { key: 'E_Closure_Annual', value: '', fieldType: 'radio' },
              { key: 'E_Closure_Annual_TOC', value: '', fieldType: 'input' },
              { key: 'E_Closure_Annual_Capex', value: '', fieldType: 'select' },
              { key: 'E_Closure_Annual_Fixed', value: '', fieldType: 'select' },
            ]
          },
        ],
      },
      {
        label: 'Financial',
        sortOrder: 5,
        isCompleted: false,
        subSteps: [
          {
            label: 'Depreciation', sortOrder: 1, isCompleted: false,
            formFields: [
              { key: 'Depreciation_Select', value: '', fieldType: 'radio' },
            ]
          },
          {
            label: 'Tax & Royalty', sortOrder: 2, isCompleted: false,
            formFields: [
              { key: 'Tax_RoyaltyRate', value: '', fieldType: 'input' },
              { key: 'Tax_TaxRate', value: '', fieldType: 'input' },
            ]
          },
          {
            label: 'Financial Rates', sortOrder: 3, isCompleted: false,
            formFields: [
              { key: 'FR_Inflation', value: '', fieldType: 'input' },
              { key: 'FR_DiscountRate', value: '', fieldType: 'input' },
            ]
          },
        ],
      },
    ];
    const version = projectName;
    const verDate = new Date().toLocaleDateString('en-US', { year: "numeric", month: "numeric", day: "numeric" });
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" });
    const npv = 0.0;
    try {
      console.log("Creating project...", stepsData);
      setIsLoading(true);

      const projectResponse = await (API.graphql({
        query: createProject,
        variables: {
          input: {
            name,
            location,
            date,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<{ data: CreateProjectMutation }>);

      const projectId = projectResponse.data.createProject?.id;

      const versionResponse = await (API.graphql({
        query: createVersion,
        variables: {
          input: {
            version,
            time,
            date: verDate,
            npv,
            projectID: projectId,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<{ data: CreateVersionMutation }>);

      const versionId = versionResponse.data.createVersion?.id;

      // Create steps and substeps
      await Promise.all(
        stepsData.map(async (stepData) => {
          const stepResponse = await (API.graphql({
            query: createStep,
            variables: {
              input: {
                sortOrder: stepData.sortOrder,
                label: stepData.label,
                isCompleted: stepData.isCompleted,
                versionID: versionId,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          }) as Promise<{ data: CreateStepMutation }>);

          const stepId = stepResponse.data.createStep?.id;

          await Promise.all(
            stepData.subSteps.map(async (subStepData) => {
              console.log("subStepData", subStepData);
              const subStepsResult = await (API.graphql({
                query: createSubStep,
                variables: {
                  input: {
                    sortOrder: subStepData.sortOrder,
                    label: subStepData.label,
                    isCompleted: subStepData.isCompleted,
                    stepID: stepId,
                  },
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              }) as Promise<{ data: CreateSubStepMutation }>);

              const subStepId = subStepsResult.data.createSubStep?.id;

              // Create form fields
              await Promise.all(
                (subStepData.formFields || []).map(async (field) => {
                  await API.graphql({
                    query: createFormField,
                    variables: {
                      input: {
                        key: field.key,
                        value: field.value,
                        fieldType: field.fieldType,
                        subStepID: subStepId,
                      },
                    },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                  });

                  console.log("Created form field", field);
                })
              );
            })
          );
        })
      );

      window.location.href = "/projects/" + name;
      //setIsLoading(false);
    } catch (e) {
      console.error("Error storing project by username. ", e);
    }
  };

  return (
    <>
      <Head>
        <title>Stormlands</title>
        <meta name="Meta nema" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-min-5/6 pb-16 py-4 m-auto w-5/6">
        <Modal title={"Start New Project"}>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              paddingLeft: 3,
              paddingRight: 3,
              paddingTop: 3,
              height: 'auto',
              width: '100%',
            }}
            className="stormShadowNoTop"
          >
            <div className="w-full flex flex-col justify-between items-center min-h-5/6">
              {isLoading ? (
                <Box className="h-[490px]" >
                  <CircularProgress className="mt-[245px]" />
                </Box>
              ) : (
                <ProjectCreate
                  storeProject={storeProject}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onDataChange={handleDataChange}
                />
              )}
              <Footer
                projectName={projectName}
                projectLocation={projectLocation}
                projectDate={projectDate}
              ></Footer>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );

};

const Footer: React.FC<FooterProps> = ({ projectName, projectLocation, projectDate }) => {
  const { user, setUser } = useUser();

  return (
    <footer className="border-t border-neutral-100  w-full min-h-16 pl-4">
      <div className="my-2 py-2 mx-2">
        <ul className="inline-block text-sm min-w-10">
          <li className="pb-2">
            Version: <span>{projectName}</span>
          </li>
          <li className="pb-2">
            Date: <span>{projectDate}</span>
          </li>
          <li className="">
            Created By: <span>{user ? user.username : ""}</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default CreateNewProject;
