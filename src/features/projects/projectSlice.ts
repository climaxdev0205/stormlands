import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { userAgent } from "next/server";
import {deleteUser} from "../../graphql/mutations";
import * as mutations from "../../graphql/mutations";
import { listUsers, userByUsername, listProjects } from "../../graphql/queries";
import {
  DeleteProjectMutation,
  GetUserQuery,
  ListProjectsQuery,
  DeleteUserMutation
} from "../../API";
import {Project} from '../../API'

import {
  UserByUsernameQuery,
} from "../../API";
import {
  storeProjectToUserByUsername,
  getProjectsByUsername,
  getUserIdByUsername,
} from "./projectService";

// First, create the thunk
export const storeProject = createAsyncThunk(
  "project/storeProject",
  async (username: string, { getState, rejectWithValue }) => {
    const state: any = getState(); // get redux global state
    const newProject: Project = state.project.newProject; // retrieve project to store from redux state

    // Validation
    // Error messages for user
    if (!username) return rejectWithValue("User cannot empty");
    if (!newProject.name || newProject.name == "")
      return rejectWithValue("Project name cannot be empty!");
    if (!newProject.location || newProject.location == "")
      return rejectWithValue("Project location cannot be empty!");
    if (!newProject.date || newProject.date == "")
      return rejectWithValue("Project date cannot be empty!");

    // store project in dynamodb
    const result = await storeProjectToUserByUsername(newProject, 'Alan_Skovrlj');
    if(result) return result
    else return null
  }
);

 const helperFetchAllProjects = async () => {
  getProjectsByUsername("alan_skovrlj");
  const response = (await API.graphql({
    query: listProjects,
  })) as { data: ListProjectsQuery };
  return response.data.listProjects?.items;
}; 
export const loadProjects = createAsyncThunk(
  "project/listAllProjects",
  async () => {
     try {
       const response = (await API.graphql({
         query: userByUsername,
         variables: { username: 'alan_skovrlj'},
       })) as { data: UserByUsernameQuery };
       const userProjects = response.data.userByUsername?.items[0];
        return userProjects;
       console.log("projects by user", response);
       if (userProjects) return userProjects;
     } catch (e) {
       console.log(e);
     }
  }
);

export const deleteProjectById = createAsyncThunk(
  "project/deleteProjectById",
  async (projectId: string) => {
    const response = (await API.graphql({
      query: mutations.deleteProject,
      variables: { input: projectId },
    })) as { data: DeleteProjectMutation };
    console.log(response);
    return response.data.deleteProject?.id;
  }
);
export const projectsSlice = createSlice({
  name: "project",
  initialState: {
    projects: [] as Array<any>,
    newProject: {
      name: "",
      location: "",
      date: "1.1.",
      id: "",
    },
    loading: "idle",
  },
  reducers: {
    addProject: (state, action) => {
      state.newProject = action.payload;
      return state;
    },
    deleteProject: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(storeProject.pending, (state, action) => {
        console.log("Pending...");
      })
      .addCase(storeProject.fulfilled, (state, action) => {
        console.log("Success!");
        if (action.payload) state.newProject.id = action.payload.id;
        return state;
      })
      .addCase(storeProject.rejected, (state, action) => {
        console.log("Rejected!");
      });
  },
});

export const { addProject, deleteProject } = projectsSlice.actions;

export const selectAllProjects = (state: any) => state.project;

export default projectsSlice.reducer;