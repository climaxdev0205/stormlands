import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import {CiCircleRemove, CiShop, CiViewBoard, CiViewTable, CiViewTimeline, CiCalendar} from 'react-icons/ci';
import {BsArrowRight, BsArrowLeft} from "react-icons/bs";
import {ListVersionsQuery, Project, Version} from "../../API";
import {Button} from "@mui/material";
import {API} from "aws-amplify";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";
import gql from 'graphql-tag';

// customQuery that returns all versions with all form fields
export const listVersionsWithFormFields = gql`
  query ListVersionsWithFormFields(
    $filter: ModelVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVersions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        version
        time
        date
        status
        npv
        projectID
        steps {
          items {
            id
            sortOrder
            label
            isCompleted
            versionID
            subSteps {
              items {
                id
                sortOrder
                label
                isCompleted
                stepID
                formFields {
                  items {
                    id
                    key
                    value
                    fieldType
                    subStepID
                    createdAt
                    updatedAt
                    owner
                  }
                  nextToken
                }
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

interface Props {
    projects: Project[] | null;
    onChangeProject: (data: any) => void;
    onChangeAnalysis: (data: any) => void;
    onChangeVariables: (data: any) => void;
    isSidebarOpen: boolean;
    setIsSidebarOpen: (data: any) => void;
    onChangeVersion: (data: any) => void;
    onChangeType: (type: string) => void;
}

const BuilderForm: React.FC<Props> = ({
                                          projects,
                                          onChangeProject,
                                          onChangeAnalysis,
                                          onChangeVariables,
                                          isSidebarOpen,
                                          setIsSidebarOpen,
                                          onChangeVersion,
                                          onChangeType,
                                      }) => {
    const [analysisParent, setAnalysisParent] = useState<string>('');
    const [analysisType, setAnalysisType] = useState<string>('');
    const [scenarioMode, setScenarioMode] = useState<boolean>(false);
    const [sensitivityType, setSensitivityType] = useState<string>('');
    const [variables, setVariables] = useState<string[]>([]);
    const [versions, setVersions] = useState<Version[]>([]);
    const [selectedVersion, setSelectedVersion] = useState<string>('');

    const [formProject, setFormProject] = useState<string>('');
    const [formVersion, setFormVersion] = useState<string>('');

    const onApply = () => {
        if (analysisType === "Scenario") {
            setScenarioMode(true);
        }
        if (versions.length > 0) {
            onChangeProject(projects)
            onChangeAnalysis(analysisType);
            onChangeVariables(variables);
            onChangeVersion(selectedVersion);
        }
    }

    const onSensitivityTable = () => {
        setIsSidebarOpen(false);
        onChangeProject(projects)
        onChangeAnalysis("SensitivityTable");
        onChangeType(sensitivityType);
    }

    const fetchVersions = async (projectID: string): Promise<Version[]> => {
        const allVersions = (await API.graphql({
            query: listVersionsWithFormFields,
            variables: {
                filter: {
                    projectID: {
                        eq: projectID,
                    }
                },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as {
            data: ListVersionsQuery;
            errors: any[];
        };

        if (allVersions.data.listVersions) {
            console.log(allVersions.data.listVersions.items);
            setVersions(allVersions.data.listVersions.items as Version[]);
            return allVersions.data.listVersions.items as Version[];
        } else {
            console.log("No versions found");
            setVersions([]);
            return [];
        }
    };

    function generateMenuItems(items: any[]) {
        return items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
                {item.label}
            </MenuItem>
        ));
    }

    const generateVariableMenuItems = () => {
        const baseItems = [
            {label: "All", value: "All"},
            {label: "Ore Production", value: "Ore Production"},
            {label: "Zinc Grade", value: "Zinc Grade"},
            {label: "Zinc Revenue", value: "Zinc Revenue"},
            {label: "Lead Grade", value: "Lead Grade"},
            {label: "Lead Revenue", value: "Lead Revenue"},
            {label: "Total Revenue", value: "Total Revenue"},
            {label: "Operating Cost", value: "Operating Cost"},
            {label: "Operating Margin", value: "Operating Margin"},
            {label: "Capital Cost", value: "Capital Cost"},
            {label: "Working Capital", value: "Working Capital"},
            {label: "Royalties", value: "Royalties"},
            {
                label: "Capital Allowances",
                value: "Capital Allowances"
            },
            {label: "Taxable Income", value: "Taxable Income"},
            {label: "Corporate Taxes", value: "Corporate Taxes"},
            {label: "Cashflow", value: "Cashflow"},
            {
                label: "Cumulative Cashflow",
                value: "Cumulative Cashflow"
            },
            {
                label: "Discounted Cashflow",
                value: "Discounted Cashflow"
            },
            { label: "Cumulative Discounted Cashflow", value: "Cumulative Discounted Cashflow" },
            {label: "NPV", value: "NPV"},
            {label: "IRR", value: "IRR"},
        ];
    
        if (analysisType === "Graph") {
            return baseItems.filter(
                item => item.label !== "NPV" && 
                item.label !== "IRR" &&
                item.label !== "All");
        } else {
            return baseItems;
        }
    };

    function addVariableItem(item: string) {
        if (!variables.includes(item)) {
            setVariables([...variables, item]);
        }
    }

    function removeVariableItem(item: string) {
        const newList = variables.filter(v => v !== item);
        setVariables(newList);
    }

    function generateVariableItems(items: any[]) {
        if (items.length === 0) {
            return null
        }
        // @ts-ignore
        return items.map((item) => (
            <div key={item}>
                <Grid container sx={{display: "flex", marginBottom: 1}}>
                    <Grid xs={10}>
                        <h6>{item}</h6>
                    </Grid>
                    <Grid xs={2}>
                        <CiCircleRemove size={25} onClick={() => removeVariableItem(item)}/>
                    </Grid>
                </Grid>
            </div>
        ));
    }

    // @ts-ignore
    return (
        <>
            {
                !isSidebarOpen ? (
                    <div className="flex flex-col grow stormShadow" style={{width: 80, height: 850}}>
                        <Typography
                            sx={{
                                marginTop: 3,
                                fontSize: 20,
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: "Center"
                            }}
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <BsArrowRight/>
                        </Typography>
                        <Typography
                            sx={{fontSize: 15, display: "flex", justifyContent: 'center', alignItems: "Center"}}
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            Open
                        </Typography>
                    </div>
                ) : (
                    <div className="flex flex-col pl-6 mr-8 grow stormShadow"
                         style={{overflowY: 'auto', minHeight: '100%', maxHeight: '100%'}}>
                        <Grid container alignItems="center">
                            <Grid item xs={10}>
                                <h6 className="self-start text-base mb-6" style={{marginTop: 30}}>Analytics Builder</h6>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography
                                    sx={{
                                        marginTop: 3,
                                        fontSize: 20,
                                        display: "flex",
                                        justifyContent: 'center',
                                        alignItems: "Center"
                                    }}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <BsArrowLeft/>
                                </Typography>
                                <Typography
                                    sx={{fontSize: 15, display: "flex", justifyContent: 'center', alignItems: "Center"}}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    Close
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} xs={11} alignItems="center">
                            <Grid item>
                                <CiShop size={25}/>
                            </Grid>
                            <Grid item sx={{marginTop: 1}}>
                                <h2 className="text-sm pb-2">Projects</h2>
                            </Grid>
                            <FormControl
                                fullWidth
                                size="small"
                                sx={{marginTop: 2}}
                            >
                                <Select
                                    labelId={`demo-simple-select-label-1`}
                                    id={`demo-simple-select-1`}
                                    name="project"
                                    onChange={(e) => {
                                        // console.log(e.target.value)
                                        const value = e.target.value;
                                        setFormProject(value)
                                        // @ts-ignore
                                        fetchVersions(value);
                                        // Find the project object by its ID
                                        const selectedProject = projects?.find((project) => project.id === value);

                                        // Call the onChangeProject function and pass the selected project object
                                        if (selectedProject) {
                                            onChangeProject(selectedProject);
                                        }
                                    }}
                                    value={formProject}
                                >
                                    {projects?.map((project) => {
                                        return (
                                            <MenuItem key={project.id}
                                                      value={project?.id}>{project?.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container spacing={1} xs={11} alignItems="center"
                              sx={{marginBottom: 2, marginTop: 2}}>
                            <Grid item>
                                <CiViewTimeline size={25}/>
                            </Grid>
                            <Grid item sx={{marginTop: 1}}>
                                <h2 className="text-sm pb-2">Versions</h2>
                            </Grid>
                            <FormControl
                                fullWidth
                                size="small"
                                sx={{marginTop: 2}}
                            >
                                <Select
                                    labelId={`demo-simple-select-label-2`}
                                    id={`demo-simple-select-2`}
                                    name="version"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // @ts-ignore
                                        setSelectedVersion([versions.find(v => v.id === value)]);
                                        setFormVersion(value)
                                    }}
                                    value={formVersion}
                                >
                                    {versions?.map((version) => {
                                        return (
                                            <MenuItem key={version.id}
                                                      value={version?.id}>{version?.version}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid container spacing={1} xs={11} alignItems="center"
                              sx={{marginBottom: 2, marginTop: 2}}>
                            <Grid item>
                                <CiViewBoard size={25}/>
                            </Grid>
                            <Grid item sx={{marginTop: 1}}>
                                <h2 className="text-sm pb-2">Analysis</h2>
                            </Grid>
                            <FormControl
                                fullWidth
                                size="small"
                                sx={{marginTop: 2}}
                            >
                                <Select
                                    labelId={`demo-simple-select-label-3`}
                                    id={`demo-simple-select-3`}
                                    name="analysis-1"
                                    sx={{marginBottom: 2}}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // @ts-ignore
                                        setAnalysisParent(value);
                                    }}
                                    value={analysisParent}
                                >
                                    <MenuItem value="Reports">Reports</MenuItem>
                                    <MenuItem value="Versions and logs">Versions and logs</MenuItem>
                                    <MenuItem value="Discovery">Discovery</MenuItem>
                                </Select>
                                <Select
                                    labelId={`demo-simple-select-label-4`}
                                    id={`demo-simple-select-4`}
                                    name="analysis-2"
                                    sx={{marginBottom: 2}}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // @ts-ignore
                                        setAnalysisType(value);
                                    }}
                                    value={analysisType}
                                >
                                    {analysisParent === "Reports" &&
                                        generateMenuItems([
                                            {label: "Graph", value: "Graph"},
                                            {label: "Models", value: "Models"},
                                            {label: "Scenario", value: "Scenario"}
                                        ])}
                                    {analysisParent === "Versions and logs" &&
                                        generateMenuItems([
                                            {label: "Error Detection", value: "Error Detection"},
                                            {label: "Audit Process", value: "Audit Process"},
                                            {label: "Logs", value: "Logs"},
                                            {label: "Deliverables", value: "Deliverables"}
                                        ])}
                                    {analysisParent === "Discovery" &&
                                        generateMenuItems([
                                            {label: "Compare Report", value: "Compare Report"},
                                            {label: "Variable Discovery", value: "Variable Discovery"},
                                            {label: "Calculation Discovery", value: "Calculation Discovery"},
                                            {label: "Modify Variables", value: "Modify Variables"},
                                            {label: "Modify Calculations", value: "Modify Calculations"}
                                        ])}
                                    {!(analysisParent === "Reports" || analysisParent === "Versions and logs" || analysisParent === "Discovery") &&
                                        generateMenuItems([{label: "No Options", value: "No Options"}])}
                                </Select>
                                {analysisType === "Scenario" &&
                                    <Select
                                        labelId={`demo-simple-select-label-scenario`}
                                        id={`demo-simple-select-scenario`}
                                        name="analysis-scenario"
                                        value={"Sensitivity Analysis"}
                                    >
                                        {generateMenuItems([
                                            {label: "Sensitivity Analysis", value: "Sensitivity Analysis"},
                                        ])}
                                    </Select>}
                            </FormControl>
                        </Grid>

                        {analysisType === "Scenario" && scenarioMode ?
                            (
                                <>
                                    <Grid container spacing={1} xs={11} alignItems="center"
                                          sx={{marginBottom: 2, marginTop: 2}}>
                                        <Grid item>
                                            <CiViewBoard size={25}/>
                                        </Grid>
                                        <Grid item sx={{marginTop: 1}}>
                                            <h2 className="text-sm pb-2">Type</h2>
                                        </Grid>
                                        <FormControl
                                            fullWidth
                                            size="small"
                                            sx={{marginTop: 2}}
                                        >
                                            <Select
                                                labelId={`demo-simple-select-label-period`}
                                                id={`demo-simple-select-period`}
                                                name="period-title"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // @ts-ignore
                                                    setSensitivityType(value);
                                                }}
                                                value={sensitivityType}
                                            >
                                                {generateMenuItems([
                                                    {label: "NPV", value: "NPV"},
                                                    {label: "IRR", value: "IRR"},
                                                ])}
                                            </Select>
                                            {/* <Select
                                                labelId={`demo-simple-select-label-date`}
                                                id={`demo-simple-select-date`}
                                                name="period"
                                                value={"2022 - 2023"}
                                                sx={{marginTop: 2}}
                                            >
                                                {generateMenuItems([
                                                    {
                                                        label: "2022 - 2023",
                                                        value: "2022 - 2023"
                                                    },
                                                ])}
                                            </Select> */}
                                        </FormControl>
                                    </Grid>
                                    <Grid container spacing={1} xs={11} sx={{marginBottom: 10, marginTop: 3}}
                                          alignItems="center">
                                        <Grid xs={4}/>
                                        <Grid xs={4}>
                                            <Button variant="contained" sx={{width: 100}}
                                                    onClick={onSensitivityTable}>Next</Button>
                                        </Grid>
                                    </Grid>
                                </>
                            ) :
                            (
                                <>
                                    {analysisType !== "Scenario" ?
                                        (<>
                                            <Grid container spacing={1} xs={11} alignItems="center"
                                                  sx={{marginBottom: 2, marginTop: 2}}>
                                                <Grid item>
                                                    <CiViewTable size={25}/>
                                                </Grid>
                                                <Grid item sx={{marginTop: 1}}>
                                                    <h2 className="text-sm pb-2">Variables</h2>
                                                </Grid>
                                                <FormControl
                                                    fullWidth
                                                    size="small"
                                                    sx={{marginTop: 2}}
                                                >
                                                    <Select
                                                        labelId={`demo-simple-select-label-5`}
                                                        id={`demo-simple-select-5`}
                                                        name="variable"
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            // @ts-ignore
                                                            addVariableItem(value);
                                                        }}
                                                    >
                                                        {generateMenuItems(generateVariableMenuItems())}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid container spacing={1} xs={11}
                                                  sx={{marginBottom: 1, marginTop: 1, display: "block"}}
                                                  alignItems="center">
                                                <Grid item>
                                                    <h2 className="text-sm pb-2">Applied:</h2>
                                                </Grid>
                                                <Grid item>
                                                    {generateVariableItems(variables)}
                                                </Grid>
                                            </Grid>
                                        </>) :
                                        (<></>)
                                    }
                                    <Grid container spacing={1} xs={11} sx={{marginBottom: 10, marginTop: 3}}
                                          alignItems="center">
                                        <Grid xs={4}/>
                                        <Grid xs={4}>
                                            <Button variant="contained" sx={{width: 100}}
                                                    onClick={onApply}>Apply</Button>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                    </div>
                )
            }
        </>
    );
}

export default BuilderForm;