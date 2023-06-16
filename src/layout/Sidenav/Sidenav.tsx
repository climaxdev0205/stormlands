import React, {useContext, useState, useEffect} from 'react'
import s from './Sidenav.module.css'
import Folder from "@components/icons/Folder";
import Clock from '@components/icons/Clock'
import Plus from '@components/icons/Plus'
import Link from 'next/link'
import Analysis from "@components/icons/Analysis";
import {useRouter} from 'next/router';
import {API} from "aws-amplify";
import {ListProjectsQuery, Project} from "../../API";
import {listProjects} from "../../graphql/queries";
import {GRAPHQL_AUTH_MODE} from "@aws-amplify/api";

const myref: React.RefObject<HTMLDivElement> = React.createRef()

function Sidenav() {
    const Router = useRouter()

    const [projects, setProjects] = useState<Project[]>([]);
    const [showProjects, setShowProjects] = useState<boolean>(false);
    const [selectedProjectName, setSelectedProjectName] = useState<string>("");
    const [expanded, setExpanded] = useState(false);

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
                throw new Error("Could not get projects");
            }
        };

        fetchProjectsFromApi();
    }, []);

    const handleAddNewClick = () => {
        setShowProjects(false);
        setSelectedProjectName("");
    };

    const handleShowProjects = () => {
        setShowProjects(!showProjects);
        console.log(showProjects);
    };

    const handleItemClick = (name: string, encodedName: string) => {
        setSelectedProjectName(name);

        // Check if the user is already in another project
        if (Router.pathname.startsWith("/projects/") && Router.pathname.endsWith("/")) {
            // Redirect to the new project's index page
            Router.push(`/projects/${encodedName}/index`);
        }
    };

    const expandPanel = (expand: boolean) => {
        const panels = document.getElementsByClassName('sidenavindent');
        if (panels.length > 0) {
            let panel = panels[0] as HTMLElement;
            if (expand) {
                panel.style.paddingLeft = '50px';
            }
            else {
                panel.style.paddingLeft = '204px';
            }
        }
    }

    return (
        <aside
            className={
                expanded ?
                    `${s.aside} ${s.asideExpanded} hidden md:block`
                    : `${s.aside} ${s.asideCollapsed}`
                }
            aria-label="Sidebar"
            onMouseEnter={() => {setExpanded(true); expandPanel(false);}}
            onMouseLeave={() => {setExpanded(false); expandPanel(true);}}
        >
            <Link href={"/"} className=' bg-storm-bgdefault'>
                <div
                    onClick={() => handleAddNewClick()}
                    ref={myref}
                    className={
                        expanded ?
                            `${s.button} cursor-pointer !bg-storm-bgdefault`
                            : `${s.buttonCollapsed} cursor-pointer !bg-storm-bgdefault`
                    }
                >
                    <Plus></Plus>
                    <span
                        className={
                            expanded
                                ? `${s.buttonTitle} ${s.buttonTitleExpanded} text-black bg-storm-bgdefault`
                                : `${s.buttonTitle} ${s.buttonTitleCollapsed} text-black bg-storm-bgdefault`
                        }
                    >
                        Add New Project
                    </span>
                </div>
            </Link>
            <div
                className={
                    "overflow-y-auto bg-storm-bgdefault  h-screen py-4 pl-3  dark:bg-gray-800"
                }
            >
                <ul className="space-y-2 mt-8">
                    <li>
                        <a
                            href="#"
                            onClick={() => handleShowProjects()}
                            className="flex items-center hover:border-0 p-2 text-base font-400"
                        >
                            <Folder></Folder>
                            <span
                                className={
                                    expanded
                                        ? `${s.buttonTitle} ${s.buttonTitleExpanded} flex-1 ml-3 text-neutral-100 whitespace-nowrap`
                                        : `${s.buttonTitle} ${s.buttonTitleCollapsed} flex-1 ml-3 text-neutral-100 whitespace-nowrap`
                                }
                            >
                                My Projects
                            </span>
                        </a>
                    </li>
                    {showProjects && expanded && projects.map((project, index) => {
                        return (
                            <li key={index}
                                className={selectedProjectName === project.name ? "pl-2 border-solid border-r-8 border-indigo-500 outline-offset-2" : "pl-2"}>
                                <div className='h-10'>
                                    <Link
                                        href={`/projects/${encodeURIComponent(project.name).replace(/#/g, '%23').replace(/ /g, '%20')}/`}
                                        legacyBehavior
                                        className="flex items-center hover:border-0 p-2 text-base font-400"
                                    >
                                        <span
                                            onClick={() => handleItemClick(project.name, encodeURIComponent(project.name).replace(/#/g, '%23').replace(/ /g, '%20'))}
                                            className="flex-1 ml-3 text-neutral-100 whitespace-nowrap"
                                        >
                                            {project.name}
                                        </span>
                                    </Link>
                                </div>
                            </li>
                        );
                    })
                    }

                    <li>
                        <a
                            href="#"
                            onClick={() => Router.push("/analysis")}
                            className="flex items-center hover:border-0 text-neutral-100  p-2 text-base font-normal"
                        >
                            <Analysis></Analysis>
                            <span
                                className={
                                    expanded
                                        ? `${s.buttonTitle} ${s.buttonTitleExpanded} flex-1 ml-3 whitespace-nowrap`
                                        : `${s.buttonTitle} ${s.buttonTitleCollapsed} flex-1 ml-3 whitespace-nowrap`
                                }
                            >
                                Analysis
                            </span>
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidenav