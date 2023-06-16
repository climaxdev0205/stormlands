/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      name
      surname
      bio
      photo
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        name
        surname
        bio
        photo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByUsername = /* GraphQL */ `
  query UserByUsername(
    $username: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        username
        email
        name
        surname
        bio
        photo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProject = /* GraphQL */ `
  query GetProject($id: ID!) {
    getProject(id: $id) {
      id
      name
      location
      date
      versions {
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
                nextToken
              }
              createdAt
              updatedAt
              owner
            }
            nextToken
          }
          isCompleted
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
  }
`;
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        date
        versions {
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
                createdAt
                updatedAt
                owner
              }
              nextToken
            }
            isCompleted
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
export const getVersion = /* GraphQL */ `
  query GetVersion($id: ID!) {
    getVersion(id: $id) {
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
      isCompleted
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listVersions = /* GraphQL */ `
  query ListVersions(
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
        isCompleted
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const versionByProject = /* GraphQL */ `
  query VersionByProject(
    $projectID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelVersionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    versionByProject(
      projectID: $projectID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
        isCompleted
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getStep = /* GraphQL */ `
  query GetStep($id: ID!) {
    getStep(id: $id) {
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
  }
`;
export const listSteps = /* GraphQL */ `
  query ListSteps(
    $filter: ModelStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const stepByVersion = /* GraphQL */ `
  query StepByVersion(
    $versionID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stepByVersion(
      versionID: $versionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getSubStep = /* GraphQL */ `
  query GetSubStep($id: ID!) {
    getSubStep(id: $id) {
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
  }
`;
export const listSubSteps = /* GraphQL */ `
  query ListSubSteps(
    $filter: ModelSubStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubSteps(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const subStepByStep = /* GraphQL */ `
  query SubStepByStep(
    $stepID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSubStepFilterInput
    $limit: Int
    $nextToken: String
  ) {
    subStepByStep(
      stepID: $stepID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const getFormField = /* GraphQL */ `
  query GetFormField($id: ID!) {
    getFormField(id: $id) {
      id
      key
      value
      fieldType
      subStepID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listFormFields = /* GraphQL */ `
  query ListFormFields(
    $filter: ModelFormFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFormFields(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const formFieldBySubStep = /* GraphQL */ `
  query FormFieldBySubStep(
    $subStepID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFormFieldFilterInput
    $limit: Int
    $nextToken: String
  ) {
    formFieldBySubStep(
      subStepID: $subStepID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
