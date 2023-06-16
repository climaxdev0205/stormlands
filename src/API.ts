/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  email?: string | null,
  name?: string | null,
  surname?: string | null,
  bio?: string | null,
  photo?: string | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  surname?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  email?: string | null,
  name?: string | null,
  surname?: string | null,
  bio?: string | null,
  photo?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  email?: string | null,
  name?: string | null,
  surname?: string | null,
  bio?: string | null,
  photo?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateProjectInput = {
  id?: string | null,
  name: string,
  location: string,
  date: string,
};

export type ModelProjectConditionInput = {
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelProjectConditionInput | null > | null,
  or?: Array< ModelProjectConditionInput | null > | null,
  not?: ModelProjectConditionInput | null,
};

export type Project = {
  __typename: "Project",
  id: string,
  name: string,
  location: string,
  date: string,
  versions?: ModelVersionConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelVersionConnection = {
  __typename: "ModelVersionConnection",
  items:  Array<Version | null >,
  nextToken?: string | null,
};

export type Version = {
  __typename: "Version",
  id: string,
  version: string,
  time: string,
  date: string,
  status?: string | null,
  npv: number,
  projectID: string,
  steps?: ModelStepConnection | null,
  isCompleted?: boolean | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelStepConnection = {
  __typename: "ModelStepConnection",
  items:  Array<Step | null >,
  nextToken?: string | null,
};

export type Step = {
  __typename: "Step",
  id: string,
  sortOrder: number,
  label: string,
  isCompleted: boolean,
  versionID: string,
  subSteps?: ModelSubStepConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelSubStepConnection = {
  __typename: "ModelSubStepConnection",
  items:  Array<SubStep | null >,
  nextToken?: string | null,
};

export type SubStep = {
  __typename: "SubStep",
  id: string,
  sortOrder: number,
  label: string,
  isCompleted: boolean,
  stepID: string,
  formFields?: ModelFormFieldConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelFormFieldConnection = {
  __typename: "ModelFormFieldConnection",
  items:  Array<FormField | null >,
  nextToken?: string | null,
};

export type FormField = {
  __typename: "FormField",
  id: string,
  key: string,
  value: string,
  fieldType: string,
  subStepID: string,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateProjectInput = {
  id: string,
  name?: string | null,
  location?: string | null,
  date?: string | null,
};

export type DeleteProjectInput = {
  id: string,
};

export type CreateVersionInput = {
  id?: string | null,
  version: string,
  time: string,
  date: string,
  status?: string | null,
  npv: number,
  projectID: string,
  isCompleted?: boolean | null,
};

export type ModelVersionConditionInput = {
  version?: ModelStringInput | null,
  time?: ModelStringInput | null,
  date?: ModelStringInput | null,
  status?: ModelStringInput | null,
  npv?: ModelFloatInput | null,
  projectID?: ModelIDInput | null,
  isCompleted?: ModelBooleanInput | null,
  and?: Array< ModelVersionConditionInput | null > | null,
  or?: Array< ModelVersionConditionInput | null > | null,
  not?: ModelVersionConditionInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateVersionInput = {
  id: string,
  version?: string | null,
  time?: string | null,
  date?: string | null,
  status?: string | null,
  npv?: number | null,
  projectID?: string | null,
  isCompleted?: boolean | null,
};

export type DeleteVersionInput = {
  id: string,
};

export type CreateStepInput = {
  id?: string | null,
  sortOrder: number,
  label: string,
  isCompleted: boolean,
  versionID: string,
};

export type ModelStepConditionInput = {
  sortOrder?: ModelIntInput | null,
  label?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  versionID?: ModelIDInput | null,
  and?: Array< ModelStepConditionInput | null > | null,
  or?: Array< ModelStepConditionInput | null > | null,
  not?: ModelStepConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateStepInput = {
  id: string,
  sortOrder?: number | null,
  label?: string | null,
  isCompleted?: boolean | null,
  versionID?: string | null,
};

export type DeleteStepInput = {
  id: string,
};

export type CreateSubStepInput = {
  sortOrder: number,
  label: string,
  isCompleted?: boolean | null,
  stepID: string,
  formFields?: Array< CreateFormFieldInput | null > | null,
};

export type CreateFormFieldInput = {
  key: string,
  value: string,
  fieldType: string,
  subStepID: string,
};

export type ModelSubStepConditionInput = {
  sortOrder?: ModelIntInput | null,
  label?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  stepID?: ModelIDInput | null,
  and?: Array< ModelSubStepConditionInput | null > | null,
  or?: Array< ModelSubStepConditionInput | null > | null,
  not?: ModelSubStepConditionInput | null,
};

export type UpdateSubStepInput = {
  id: string,
  sortOrder?: number | null,
  label?: string | null,
  isCompleted?: boolean | null,
  stepID?: string | null,
};

export type DeleteSubStepInput = {
  id: string,
};

export type ModelFormFieldConditionInput = {
  key?: ModelStringInput | null,
  value?: ModelStringInput | null,
  fieldType?: ModelStringInput | null,
  subStepID?: ModelIDInput | null,
  and?: Array< ModelFormFieldConditionInput | null > | null,
  or?: Array< ModelFormFieldConditionInput | null > | null,
  not?: ModelFormFieldConditionInput | null,
};

export type UpdateFormFieldInput = {
  id: string,
  key?: string | null,
  value?: string | null,
  fieldType?: string | null,
  subStepID?: string | null,
};

export type DeleteFormFieldInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  surname?: ModelStringInput | null,
  bio?: ModelStringInput | null,
  photo?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelProjectFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  date?: ModelStringInput | null,
  and?: Array< ModelProjectFilterInput | null > | null,
  or?: Array< ModelProjectFilterInput | null > | null,
  not?: ModelProjectFilterInput | null,
};

export type ModelProjectConnection = {
  __typename: "ModelProjectConnection",
  items:  Array<Project | null >,
  nextToken?: string | null,
};

export type ModelVersionFilterInput = {
  id?: ModelIDInput | null,
  version?: ModelStringInput | null,
  time?: ModelStringInput | null,
  date?: ModelStringInput | null,
  status?: ModelStringInput | null,
  npv?: ModelFloatInput | null,
  projectID?: ModelIDInput | null,
  isCompleted?: ModelBooleanInput | null,
  and?: Array< ModelVersionFilterInput | null > | null,
  or?: Array< ModelVersionFilterInput | null > | null,
  not?: ModelVersionFilterInput | null,
};

export type ModelStepFilterInput = {
  id?: ModelIDInput | null,
  sortOrder?: ModelIntInput | null,
  label?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  versionID?: ModelIDInput | null,
  and?: Array< ModelStepFilterInput | null > | null,
  or?: Array< ModelStepFilterInput | null > | null,
  not?: ModelStepFilterInput | null,
};

export type ModelSubStepFilterInput = {
  id?: ModelIDInput | null,
  sortOrder?: ModelIntInput | null,
  label?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  stepID?: ModelIDInput | null,
  and?: Array< ModelSubStepFilterInput | null > | null,
  or?: Array< ModelSubStepFilterInput | null > | null,
  not?: ModelSubStepFilterInput | null,
};

export type ModelFormFieldFilterInput = {
  id?: ModelIDInput | null,
  key?: ModelStringInput | null,
  value?: ModelStringInput | null,
  fieldType?: ModelStringInput | null,
  subStepID?: ModelIDInput | null,
  and?: Array< ModelFormFieldFilterInput | null > | null,
  or?: Array< ModelFormFieldFilterInput | null > | null,
  not?: ModelFormFieldFilterInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  surname?: ModelSubscriptionStringInput | null,
  bio?: ModelSubscriptionStringInput | null,
  photo?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionProjectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProjectFilterInput | null > | null,
  or?: Array< ModelSubscriptionProjectFilterInput | null > | null,
};

export type ModelSubscriptionVersionFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  version?: ModelSubscriptionStringInput | null,
  time?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  npv?: ModelSubscriptionFloatInput | null,
  projectID?: ModelSubscriptionIDInput | null,
  isCompleted?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionVersionFilterInput | null > | null,
  or?: Array< ModelSubscriptionVersionFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionStepFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  label?: ModelSubscriptionStringInput | null,
  isCompleted?: ModelSubscriptionBooleanInput | null,
  versionID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionStepFilterInput | null > | null,
  or?: Array< ModelSubscriptionStepFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionSubStepFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  sortOrder?: ModelSubscriptionIntInput | null,
  label?: ModelSubscriptionStringInput | null,
  isCompleted?: ModelSubscriptionBooleanInput | null,
  stepID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionSubStepFilterInput | null > | null,
  or?: Array< ModelSubscriptionSubStepFilterInput | null > | null,
};

export type ModelSubscriptionFormFieldFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  key?: ModelSubscriptionStringInput | null,
  value?: ModelSubscriptionStringInput | null,
  fieldType?: ModelSubscriptionStringInput | null,
  subStepID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionFormFieldFilterInput | null > | null,
  or?: Array< ModelSubscriptionFormFieldFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProjectMutationVariables = {
  input: CreateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type CreateProjectMutation = {
  createProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateProjectMutationVariables = {
  input: UpdateProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type UpdateProjectMutation = {
  updateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteProjectMutationVariables = {
  input: DeleteProjectInput,
  condition?: ModelProjectConditionInput | null,
};

export type DeleteProjectMutation = {
  deleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateVersionMutationVariables = {
  input: CreateVersionInput,
  condition?: ModelVersionConditionInput | null,
};

export type CreateVersionMutation = {
  createVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateVersionMutationVariables = {
  input: UpdateVersionInput,
  condition?: ModelVersionConditionInput | null,
};

export type UpdateVersionMutation = {
  updateVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteVersionMutationVariables = {
  input: DeleteVersionInput,
  condition?: ModelVersionConditionInput | null,
};

export type DeleteVersionMutation = {
  deleteVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateStepMutationVariables = {
  input: CreateStepInput,
  condition?: ModelStepConditionInput | null,
};

export type CreateStepMutation = {
  createStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateStepMutationVariables = {
  input: UpdateStepInput,
  condition?: ModelStepConditionInput | null,
};

export type UpdateStepMutation = {
  updateStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteStepMutationVariables = {
  input: DeleteStepInput,
  condition?: ModelStepConditionInput | null,
};

export type DeleteStepMutation = {
  deleteStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateSubStepMutationVariables = {
  input: CreateSubStepInput,
  condition?: ModelSubStepConditionInput | null,
};

export type CreateSubStepMutation = {
  createSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateSubStepMutationVariables = {
  input: UpdateSubStepInput,
  condition?: ModelSubStepConditionInput | null,
};

export type UpdateSubStepMutation = {
  updateSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteSubStepMutationVariables = {
  input: DeleteSubStepInput,
  condition?: ModelSubStepConditionInput | null,
};

export type DeleteSubStepMutation = {
  deleteSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateFormFieldMutationVariables = {
  input: CreateFormFieldInput,
  condition?: ModelFormFieldConditionInput | null,
};

export type CreateFormFieldMutation = {
  createFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateFormFieldMutationVariables = {
  input: UpdateFormFieldInput,
  condition?: ModelFormFieldConditionInput | null,
};

export type UpdateFormFieldMutation = {
  updateFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteFormFieldMutationVariables = {
  input: DeleteFormFieldInput,
  condition?: ModelFormFieldConditionInput | null,
};

export type DeleteFormFieldMutation = {
  deleteFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email?: string | null,
      name?: string | null,
      surname?: string | null,
      bio?: string | null,
      photo?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UserByUsernameQueryVariables = {
  username: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UserByUsernameQuery = {
  userByUsername?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      email?: string | null,
      name?: string | null,
      surname?: string | null,
      bio?: string | null,
      photo?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProjectQueryVariables = {
  id: string,
};

export type GetProjectQuery = {
  getProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectConnection",
    items:  Array< {
      __typename: "Project",
      id: string,
      name: string,
      location: string,
      date: string,
      versions?:  {
        __typename: "ModelVersionConnection",
        items:  Array< {
          __typename: "Version",
          id: string,
          version: string,
          time: string,
          date: string,
          status?: string | null,
          npv: number,
          projectID: string,
          steps?:  {
            __typename: "ModelStepConnection",
            items:  Array< {
              __typename: "Step",
              id: string,
              sortOrder: number,
              label: string,
              isCompleted: boolean,
              versionID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          isCompleted?: boolean | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVersionQueryVariables = {
  id: string,
};

export type GetVersionQuery = {
  getVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListVersionsQueryVariables = {
  filter?: ModelVersionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVersionsQuery = {
  listVersions?:  {
    __typename: "ModelVersionConnection",
    items:  Array< {
      __typename: "Version",
      id: string,
      version: string,
      time: string,
      date: string,
      status?: string | null,
      npv: number,
      projectID: string,
      steps?:  {
        __typename: "ModelStepConnection",
        items:  Array< {
          __typename: "Step",
          id: string,
          sortOrder: number,
          label: string,
          isCompleted: boolean,
          versionID: string,
          subSteps?:  {
            __typename: "ModelSubStepConnection",
            items:  Array< {
              __typename: "SubStep",
              id: string,
              sortOrder: number,
              label: string,
              isCompleted: boolean,
              stepID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      isCompleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type VersionByProjectQueryVariables = {
  projectID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelVersionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type VersionByProjectQuery = {
  versionByProject?:  {
    __typename: "ModelVersionConnection",
    items:  Array< {
      __typename: "Version",
      id: string,
      version: string,
      time: string,
      date: string,
      status?: string | null,
      npv: number,
      projectID: string,
      steps?:  {
        __typename: "ModelStepConnection",
        items:  Array< {
          __typename: "Step",
          id: string,
          sortOrder: number,
          label: string,
          isCompleted: boolean,
          versionID: string,
          subSteps?:  {
            __typename: "ModelSubStepConnection",
            items:  Array< {
              __typename: "SubStep",
              id: string,
              sortOrder: number,
              label: string,
              isCompleted: boolean,
              stepID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      isCompleted?: boolean | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStepQueryVariables = {
  id: string,
};

export type GetStepQuery = {
  getStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListStepsQueryVariables = {
  filter?: ModelStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStepsQuery = {
  listSteps?:  {
    __typename: "ModelStepConnection",
    items:  Array< {
      __typename: "Step",
      id: string,
      sortOrder: number,
      label: string,
      isCompleted: boolean,
      versionID: string,
      subSteps?:  {
        __typename: "ModelSubStepConnection",
        items:  Array< {
          __typename: "SubStep",
          id: string,
          sortOrder: number,
          label: string,
          isCompleted: boolean,
          stepID: string,
          formFields?:  {
            __typename: "ModelFormFieldConnection",
            items:  Array< {
              __typename: "FormField",
              id: string,
              key: string,
              value: string,
              fieldType: string,
              subStepID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type StepByVersionQueryVariables = {
  versionID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type StepByVersionQuery = {
  stepByVersion?:  {
    __typename: "ModelStepConnection",
    items:  Array< {
      __typename: "Step",
      id: string,
      sortOrder: number,
      label: string,
      isCompleted: boolean,
      versionID: string,
      subSteps?:  {
        __typename: "ModelSubStepConnection",
        items:  Array< {
          __typename: "SubStep",
          id: string,
          sortOrder: number,
          label: string,
          isCompleted: boolean,
          stepID: string,
          formFields?:  {
            __typename: "ModelFormFieldConnection",
            items:  Array< {
              __typename: "FormField",
              id: string,
              key: string,
              value: string,
              fieldType: string,
              subStepID: string,
              createdAt: string,
              updatedAt: string,
              owner?: string | null,
            } | null >,
            nextToken?: string | null,
          } | null,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetSubStepQueryVariables = {
  id: string,
};

export type GetSubStepQuery = {
  getSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListSubStepsQueryVariables = {
  filter?: ModelSubStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSubStepsQuery = {
  listSubSteps?:  {
    __typename: "ModelSubStepConnection",
    items:  Array< {
      __typename: "SubStep",
      id: string,
      sortOrder: number,
      label: string,
      isCompleted: boolean,
      stepID: string,
      formFields?:  {
        __typename: "ModelFormFieldConnection",
        items:  Array< {
          __typename: "FormField",
          id: string,
          key: string,
          value: string,
          fieldType: string,
          subStepID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type SubStepByStepQueryVariables = {
  stepID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelSubStepFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type SubStepByStepQuery = {
  subStepByStep?:  {
    __typename: "ModelSubStepConnection",
    items:  Array< {
      __typename: "SubStep",
      id: string,
      sortOrder: number,
      label: string,
      isCompleted: boolean,
      stepID: string,
      formFields?:  {
        __typename: "ModelFormFieldConnection",
        items:  Array< {
          __typename: "FormField",
          id: string,
          key: string,
          value: string,
          fieldType: string,
          subStepID: string,
          createdAt: string,
          updatedAt: string,
          owner?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetFormFieldQueryVariables = {
  id: string,
};

export type GetFormFieldQuery = {
  getFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListFormFieldsQueryVariables = {
  filter?: ModelFormFieldFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFormFieldsQuery = {
  listFormFields?:  {
    __typename: "ModelFormFieldConnection",
    items:  Array< {
      __typename: "FormField",
      id: string,
      key: string,
      value: string,
      fieldType: string,
      subStepID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type FormFieldBySubStepQueryVariables = {
  subStepID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelFormFieldFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type FormFieldBySubStepQuery = {
  formFieldBySubStep?:  {
    __typename: "ModelFormFieldConnection",
    items:  Array< {
      __typename: "FormField",
      id: string,
      key: string,
      value: string,
      fieldType: string,
      subStepID: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  username?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    email?: string | null,
    name?: string | null,
    surname?: string | null,
    bio?: string | null,
    photo?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnCreateProjectSubscription = {
  onCreateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnUpdateProjectSubscription = {
  onUpdateProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteProjectSubscriptionVariables = {
  filter?: ModelSubscriptionProjectFilterInput | null,
  owner?: string | null,
};

export type OnDeleteProjectSubscription = {
  onDeleteProject?:  {
    __typename: "Project",
    id: string,
    name: string,
    location: string,
    date: string,
    versions?:  {
      __typename: "ModelVersionConnection",
      items:  Array< {
        __typename: "Version",
        id: string,
        version: string,
        time: string,
        date: string,
        status?: string | null,
        npv: number,
        projectID: string,
        steps?:  {
          __typename: "ModelStepConnection",
          items:  Array< {
            __typename: "Step",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            versionID: string,
            subSteps?:  {
              __typename: "ModelSubStepConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        isCompleted?: boolean | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateVersionSubscriptionVariables = {
  filter?: ModelSubscriptionVersionFilterInput | null,
  owner?: string | null,
};

export type OnCreateVersionSubscription = {
  onCreateVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateVersionSubscriptionVariables = {
  filter?: ModelSubscriptionVersionFilterInput | null,
  owner?: string | null,
};

export type OnUpdateVersionSubscription = {
  onUpdateVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteVersionSubscriptionVariables = {
  filter?: ModelSubscriptionVersionFilterInput | null,
  owner?: string | null,
};

export type OnDeleteVersionSubscription = {
  onDeleteVersion?:  {
    __typename: "Version",
    id: string,
    version: string,
    time: string,
    date: string,
    status?: string | null,
    npv: number,
    projectID: string,
    steps?:  {
      __typename: "ModelStepConnection",
      items:  Array< {
        __typename: "Step",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        versionID: string,
        subSteps?:  {
          __typename: "ModelSubStepConnection",
          items:  Array< {
            __typename: "SubStep",
            id: string,
            sortOrder: number,
            label: string,
            isCompleted: boolean,
            stepID: string,
            formFields?:  {
              __typename: "ModelFormFieldConnection",
              nextToken?: string | null,
            } | null,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    isCompleted?: boolean | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateStepSubscriptionVariables = {
  filter?: ModelSubscriptionStepFilterInput | null,
  owner?: string | null,
};

export type OnCreateStepSubscription = {
  onCreateStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateStepSubscriptionVariables = {
  filter?: ModelSubscriptionStepFilterInput | null,
  owner?: string | null,
};

export type OnUpdateStepSubscription = {
  onUpdateStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteStepSubscriptionVariables = {
  filter?: ModelSubscriptionStepFilterInput | null,
  owner?: string | null,
};

export type OnDeleteStepSubscription = {
  onDeleteStep?:  {
    __typename: "Step",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    versionID: string,
    subSteps?:  {
      __typename: "ModelSubStepConnection",
      items:  Array< {
        __typename: "SubStep",
        id: string,
        sortOrder: number,
        label: string,
        isCompleted: boolean,
        stepID: string,
        formFields?:  {
          __typename: "ModelFormFieldConnection",
          items:  Array< {
            __typename: "FormField",
            id: string,
            key: string,
            value: string,
            fieldType: string,
            subStepID: string,
            createdAt: string,
            updatedAt: string,
            owner?: string | null,
          } | null >,
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateSubStepSubscriptionVariables = {
  filter?: ModelSubscriptionSubStepFilterInput | null,
  owner?: string | null,
};

export type OnCreateSubStepSubscription = {
  onCreateSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateSubStepSubscriptionVariables = {
  filter?: ModelSubscriptionSubStepFilterInput | null,
  owner?: string | null,
};

export type OnUpdateSubStepSubscription = {
  onUpdateSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteSubStepSubscriptionVariables = {
  filter?: ModelSubscriptionSubStepFilterInput | null,
  owner?: string | null,
};

export type OnDeleteSubStepSubscription = {
  onDeleteSubStep?:  {
    __typename: "SubStep",
    id: string,
    sortOrder: number,
    label: string,
    isCompleted: boolean,
    stepID: string,
    formFields?:  {
      __typename: "ModelFormFieldConnection",
      items:  Array< {
        __typename: "FormField",
        id: string,
        key: string,
        value: string,
        fieldType: string,
        subStepID: string,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateFormFieldSubscriptionVariables = {
  filter?: ModelSubscriptionFormFieldFilterInput | null,
  owner?: string | null,
};

export type OnCreateFormFieldSubscription = {
  onCreateFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateFormFieldSubscriptionVariables = {
  filter?: ModelSubscriptionFormFieldFilterInput | null,
  owner?: string | null,
};

export type OnUpdateFormFieldSubscription = {
  onUpdateFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteFormFieldSubscriptionVariables = {
  filter?: ModelSubscriptionFormFieldFilterInput | null,
  owner?: string | null,
};

export type OnDeleteFormFieldSubscription = {
  onDeleteFormField?:  {
    __typename: "FormField",
    id: string,
    key: string,
    value: string,
    fieldType: string,
    subStepID: string,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
