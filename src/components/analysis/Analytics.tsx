import * as React from 'react';
import {useState, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import BuilderForm from "@components/analysis/BuilderForm";
import ModelList from "@components/analysis/models/ModelList";
import Graph from "@components/analysis/graphs/Graph";
import Sensitivity from "@components/analysis/scenario/Sensitivity";
import SensitivityTable from "@components/analysis/scenario/SensitivityTable";
import {ListProjectsQuery, Project, Version} from "../../API";
import {API} from "aws-amplify";
import {listProjects} from "../../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";
import {calculateValues} from './formulas/Calculations';

const defaultVersion: Version = {
    __typename: "Version",
    id: "",
    version: "",
    time: "",
    date: "",
    status: "",
    npv: 0,
    projectID: "",
    steps: null,
    createdAt: "",
    updatedAt: "",
    owner: null,
};

type Props = {};

const Analytics: React.FC<Props> = ({}) => {
    const [analysis, setAnalysis] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [variables, setVariables] = useState<string[]>([]);
    const [projects, setProjects] = React.useState<Project[]>([]);
    const [version, setVersion] = useState<Version>(defaultVersion);
    const [selectedDiscountRate, setSelectedDiscountRate] = useState(0);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [type, setType] = useState<string>("");

    useEffect(() => {
        const fetchProjectsFromApi = async (): Promise<Project[]> => {
            const allProjects = (await API.graphql({
                query: listProjects,
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as {
                data: ListProjectsQuery;
                errors: any[];
            };

            if (allProjects.data.listProjects) {
                setProjects(allProjects.data.listProjects.items as Project[]);
                return allProjects.data.listProjects.items as Project[];
            } else {
                throw new Error("Could not get posts");
            }
        };

        fetchProjectsFromApi();
    }, []);

    const onChangeProject = (data: Project) => {
        setSelectedProject(data);
        setAnalysis("");
    }

    const onChangeAnalysis = (data: React.SetStateAction<string>) => {
        setAnalysis(data);
    }

    const onChangeVersion = (data: Version[]) => {
        //pull the first version
        setVersion(data[0]);
    }

    const onChangeVariables = (data: string[]) => {
        setVariables(data)
    }

    const onChangeDiscountRate = (data: React.SetStateAction<number>) => {
        setSelectedDiscountRate(data);
    }

    const onChangeType = (data: React.SetStateAction<string>) => {
        setType(data);
    }

    const generateDiscountRates = (start: number, end: number, step: number): number[] => {
        const discountRates = [];

        for (let rate = start; rate <= end; rate += step) {
            discountRates.push(Math.round(rate * 10) / 10);
        }

        return discountRates;
    };

    const discountRates = generateDiscountRates(4.0, 10.0, 0.1);

    const values = calculateValues(version, selectedDiscountRate);

    // @ts-ignore
    return (
        <div className="flex flex-col p-6 mt-5 grow">
            <Grid container spacing={2} sx={{zIndex: 0}}>
                <Grid xs={isSidebarOpen ? 3 : 1}>
                    <BuilderForm
                        projects={projects}
                        onChangeProject={onChangeProject}
                        onChangeAnalysis={onChangeAnalysis}
                        onChangeVariables={onChangeVariables}
                        onChangeVersion={onChangeVersion}
                        onChangeType={onChangeType}
                        isSidebarOpen={isSidebarOpen}
                        setIsSidebarOpen={setIsSidebarOpen}
                    />
                </Grid>
                <Grid xs={isSidebarOpen ? 8 : 11}>
                    {analysis === "Models" ?
                        (<ModelList
                            projectName={selectedProject?.name}
                            variables={variables}
                            values={values}
                            discountRates={discountRates}
                            setIsSidebarOpen={setIsSidebarOpen}
                            onChangeDiscountRate={onChangeDiscountRate}
                            version={version}
                        />) :
                        analysis === "Graph" ?
                            (<Graph
                                variables={variables}
                                values={values}
                            />) :
                            analysis === "Scenario" ?
                                (<Sensitivity
                                    values={values}
                                />)
                                :
                                analysis === "SensitivityTable" ?
                                    (<SensitivityTable
                                        discountRate={selectedDiscountRate}
                                        version={version}
                                        type={type}
                                        backSensitivity={setAnalysis}
                                    />)
                                    :
                                    null
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default Analytics;