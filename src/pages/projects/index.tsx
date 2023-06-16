import type {NextPage} from "next";
import {Container} from "@components/ui";
import {useUser} from "src/context/AuthContext";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {API} from "aws-amplify";
import {ListProjectsQuery, Project} from "../../API";
import {listProjects} from "../../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";
import DataTableBase from '@components/ui/DataTable/DataTableBase';
import Link from 'next/link';
import logo from 'public/assets/stormlands-icon-rgb.png'
import Image from "next/image";
import {Button, Box, Card, CardContent, Typography, Grid, Select, MenuItem, FormControl} from '@mui/material';


const Projects: NextPage = () => {
    const {user} = useUser();
    const Router = useRouter()
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");

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

    const handleItemClick = (name: string) => {
        setSelectedProjectName(name);
        const encodedName = encodeURIComponent(name).replace(/#/g, '%23').replace(/ /g, '%20')

        Router.push(`/projects/${encodedName}`);
    };

    const tableDataItems = projects.map((project) => {
        return {
            id: project.id,
            name: project.name,
            location: project.location,
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
                name: 'Project',
                selector: (row: { name: any; }) => row.name,
                sortable: true,
                grow: 2,
            },
            {
                name: 'Location',
                selector: (row: { location: any; }) => row.location,
                sortable: true,
            },
        ],
        [],
    );

    return (
        <Container>
            <div style={{minWidth: 800}}>
                <div>{user?.username} projects:</div>
                {projects.length > 0 ? (
                    <DataTableBase
                        columns={columns}
                        data={tableDataItems}
                        onRowClicked={(row) => {
                            handleItemClick(row.name);
                        }}
                        className="rounded-2xl"
                    />
                ) : (
                    <div className="h-full flex flex-col justify-center items-center w-full">
                        <Box display="block" style={{height: 275}}>
                            <Box style={{width: "100%"}} justifyContent="center" alignItems="center" display="flex">
                                <Image alt="contact" src={logo}/>
                            </Box>
                            <Box style={{width: "100%", position: "relative", bottom: 275, height: 275}}
                                 justifyContent="center" alignItems="center" display="flex">
                                <Typography variant="h6" gutterBottom component="div" textAlign="center">
                                    <div style={{fontSize: 25}}>There is no project yet</div>
                                    <div style={{fontSize: 13}}>Please, create your first one</div>
                                </Typography>
                            </Box>
                        </Box>
                        <Box style={{width: "100%", marginTop: 50}} justifyContent="center" alignItems="center"
                             display="flex">
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                <Link
                                    href={`/projects/new-project`}
                                >
                                    Create Project
                                </Link>
                            </Button>
                        </Box>
                    </div>
                )
                }
            </div>
        </Container>
    );
};

export default Projects;
