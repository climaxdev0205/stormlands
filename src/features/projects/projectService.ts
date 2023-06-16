
import {createProject} from "../../graphql/mutations";
import * as mutations from "../../graphql/mutations";
import { listProjects, getUser, userByUsername } from "../../graphql/queries";
import {
  CreateProjectMutation,
  DeleteProjectMutation,
  GetUserQuery,
  ListProjectsQuery,
  UserByUsernameQuery
} from "../../API";
import { API } from "aws-amplify";

export const getUserIdByUsername = async (username: string) => {
  try {

  const userObj = (await API.graphql({
    query: userByUsername,
    variables: { username: username },
  })) as { data: UserByUsernameQuery };
  const userID = userObj.data.userByUsername?.items[0]?.id;
  return userID;
  } catch(e) {
    console.log(e)
  }
} 

export const getProjectsByUsername = async (username: string) => {
  try {
    const response = (await API.graphql({
      query: userByUsername,
      variables: { username: username, limit: 5, nextToken: "<token-id>" },
    })) as { data: UserByUsernameQuery };
    const userProjects = response.data.userByUsername?.items[0];
    console.log("projects by user", response);
    if (userProjects) return userProjects;
  } catch (e) {
    console.log(e);
  }
};


export const storeProjectToUserByUsername = async (projectPayload: any, username: string) => {
    const userID = await getUserIdByUsername('alan_skovrlj'); 
    if(!userID) console.log("user id undefined: ", userID)
    try {
      const response = (await API.graphql({
        query: createProject,
        variables: { input: { ...projectPayload, userProjectsId: userID} },
      })) as { data: CreateProjectMutation };
      console.log("storeeeee pr", response)
      return  response.data.createProject
    } catch (e) {
      console.error("Error storing project by username. ",e);
    }
}