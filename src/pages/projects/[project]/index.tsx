import React, { useMemo, useEffect, useState } from 'react';
import { API } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { listVersions, listProjects } from 'src/graphql/queries';
import DataTableBase from '@components/ui/DataTable/DataTableBase';
import { ListVersionsQuery, Version, ListProjectsQuery, Project } from 'src/API';
import { useUser } from "src/context/AuthContext";
import { Button, Typography, Grid } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useRouter } from 'next/router';

import { DeleteVersionMutation } from "src/API";
import { deleteVersion, deleteProject } from "src/graphql/mutations";

import MultiStepper from '@components/stepper/MultiStepper';
import s from 'src/components/ui/Container/Container.module.css';

const Index = () => {

    const { user, setUser } = useUser();
    const [versions, setVersions] = useState<Version[]>([]);
    const [projectID, setProjectID] = useState<string>('');
    const [selectedVersionId, setSelectedVersionId] = useState<string | null>(null);
    const [selectedRows, setSelectedRows] = useState<Array<{ id: string; version: string; time: string; date: string; name: string | undefined; status: string | null | undefined; npv: number; }>>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const router = useRouter();
    const projectName = decodeURIComponent(window.location.pathname.split('/')[2].replace(/%23/g, '#').replace(/%20/g, ' '));
    const [cameFromProject, setCameFromProject] = useState<boolean>(false);

    //use the projectName to query the graphql api for the project and retrieve the id
    useEffect(() => {
        const fetchProject = async (): Promise<Project> => {
            const allProjects = (await API.graphql({
                query: listProjects,
                variables: {
                    filter: {
                        name: {
                            eq: projectName,
                        }
                    },
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as {
                data: ListProjectsQuery;
                errors: any[];
            };

            if (allProjects.data.listProjects) {
                return allProjects.data.listProjects.items[0] as Project;
            } else {

                return {} as Project;
            }
        };

        fetchProject().then((project) => {
            setProjectID(project.id);
        }).catch((error) => {
            console.log(error);
            setProjectID('');
        }
        );
    }, [projectName]);

    useEffect(() => {
        const fetchVersions = async (): Promise<Version[]> => {
            const allVersions = (await API.graphql({
                query: listVersions,
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
                setVersions(allVersions.data.listVersions.items as Version[]);
                return allVersions.data.listVersions.items as Version[];
            } else {
                console.log("No versions found");
                setVersions([]);
                return [];
            }
        };

        fetchVersions().then((versions) => {
        }).catch((error) => {
            console.log(error);
        }
        );
    }, [projectID]);

    useEffect(() => {
        if (router.asPath.startsWith('/projects/') && router.asPath.endsWith('#/')) {
          setCameFromProject(true);
          console.log("came from project");
        } else {
          setCameFromProject(false);
        }
      }, [router.asPath]);

      useEffect(() => {
        if (!cameFromProject) {
            setSelectedVersionId(null);
        }
        }, [cameFromProject]);


    const handleDelete = async (id: string) => {
        const response = (await API.graphql({
          query: deleteVersion,
          variables: {
            input: {
              id,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as { data: DeleteVersionMutation };
        const versionID = response.data.deleteVersion?.id;
      
        if (versionID) {
          const newVersions = versions.filter((version) => version.id !== id);
          setVersions(newVersions);
      
          // Check if there are no versions left
          if (newVersions.length === 0) {
            // Delete the project
            await API.graphql({
              query: deleteProject,
              variables: {
                input: {
                  id: projectID,
                },
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            });
            // Redirect to the projects page
            router.push("/projects/");
          }
        }
      };
      
    const openDeleteDialog = () => {
        setOpenDialog(true);
    };

    const closeDeleteDialog = (confirm: boolean) => {
        setOpenDialog(false);
        if (confirm) {
            deleteSelectedRows();
        }
    };

    const deleteSelectedRows = () => {
        selectedRows.forEach((row: any) => {
            handleDelete(row.id);
        });
    };

    const handleSelectedRowsChanged = (newSelectedRows: { id: string; version: string; time: string; date: string; name: string | undefined; status: string | null | undefined; npv: number; }[]) => {
        console.log("Selected rows in parent component:", newSelectedRows);
        setSelectedRows(newSelectedRows);
    };   

    const tableDataItems = versions.map((version) => {
        return {
            id: version.id,
            version: version.version,
            time: version.time,
            date: version.date,
            name: user ? user.username : "",
            status: version.status,
            npv: version.npv,
        }
    });

    const columns = useMemo(
        () => [
            {
                name: 'ID',
                selector: (row: { id: any; }) => row.id,
                omit: true,
            },
            {
                name: 'Version',
                selector: (row: { version: any; }) => row.version,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Created Time',
                selector: (row: { time: any; }) => row.time,
                sortable: true,
            },
            {
                name: 'Created Date',
                selector: (row: { date: any; }) => row.date,
                sortable: true,
                right: true,
                wrap: true,
            },
            {
                name: 'User',
                selector: (row: { name: any; }) => row.name,
                sortable: true,
                right: true,
            },
            {
                name: 'Status',
                selector: (row: { status: any; }) => row.status,
                sortable: true,
                right: true,
            },
            {
                name: 'NPV',
                selector: (row: { npv: any; }) => row.npv,
                sortable: true,
                right: true,
            },
        ],
        [],
    );

    const rowStyle = {
        backgroundColor: '#F3F5F6', // add alternate row color
    };

    return (
        <>
            {selectedVersionId ? (
                <div aria-hidden="true"
                    className={"  overflow-x-hidden overflow-y-hid z-50 w-full h-full md:inset-0 justify-center items-center container mx-auto  " + s.container}>
                    <MultiStepper
                        versionId={selectedVersionId}
                        onBack={() => setSelectedVersionId(null)}
                    />
                </div>
            ) : (
                tableDataItems.length != 0 ?
                    (
                        <>
                            <Grid container spacing={3}>
                                <Grid item xs={2} />
                                <Grid item xs={8} sx={{ marginTop: 10 }}>
                                    <div className="h-full flex flex-col w-full">
                                        <Typography sx={{ alignItems: 'left', marginBottom: 5 }}>
                                            <h1 className="text-2xl font-bold">{projectName}</h1>
                                        </Typography>
                                        <Grid container sx={{ marginBottom: 5 }}>
                                            <Grid item xs={9} />
                                            <Grid item xs={3} >
                                                <Button
                                                    variant="outlined"
                                                    sx={{ width: 200 }}
                                                    onClick={openDeleteDialog}
                                                >
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <div className='text-center outline outline-offset-2 outline-[#EEEFF1] rounded-sm'>
                                            <Grid container sx={{ marginTop: 3, marginBottom: 3 }} alignItems="center">
                                                <Grid item xs={2} >
                                                    <Typography sx={{ alignItems: 'left' }}>
                                                        <h1 className="text-xl">Project Versions</h1>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <DataTableBase
                                                columns={columns}
                                                data={tableDataItems}
                                                onRowClicked={(row) => {
                                                    setSelectedVersionId(row.id);
                                                    router.push(router.asPath + "#" + "/")
                                                }}
                                                className="rounded-2xl"
                                                onSelectedRowsChanged={handleSelectedRowsChanged}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Dialog
                                open={openDialog}
                                onClose={() => closeDeleteDialog(false)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to delete the selected versions? This action cannot be undone.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => closeDeleteDialog(false)} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={() => closeDeleteDialog(true)} color="primary" autoFocus>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </>

                    ) : null
            )}
        </>
    );
};

export default Index;