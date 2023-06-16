/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createProject = /* GraphQL */ `
  mutation CreateProject(
    $input: CreateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    createProject(input: $input, condition: $condition) {
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
export const updateProject = /* GraphQL */ `
  mutation UpdateProject(
    $input: UpdateProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    updateProject(input: $input, condition: $condition) {
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
export const deleteProject = /* GraphQL */ `
  mutation DeleteProject(
    $input: DeleteProjectInput!
    $condition: ModelProjectConditionInput
  ) {
    deleteProject(input: $input, condition: $condition) {
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
export const createVersion = /* GraphQL */ `
  mutation CreateVersion(
    $input: CreateVersionInput!
    $condition: ModelVersionConditionInput
  ) {
    createVersion(input: $input, condition: $condition) {
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
export const updateVersion = /* GraphQL */ `
  mutation UpdateVersion(
    $input: UpdateVersionInput!
    $condition: ModelVersionConditionInput
  ) {
    updateVersion(input: $input, condition: $condition) {
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
export const deleteVersion = /* GraphQL */ `
  mutation DeleteVersion(
    $input: DeleteVersionInput!
    $condition: ModelVersionConditionInput
  ) {
    deleteVersion(input: $input, condition: $condition) {
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
export const createStep = /* GraphQL */ `
  mutation CreateStep(
    $input: CreateStepInput!
    $condition: ModelStepConditionInput
  ) {
    createStep(input: $input, condition: $condition) {
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
export const updateStep = /* GraphQL */ `
  mutation UpdateStep(
    $input: UpdateStepInput!
    $condition: ModelStepConditionInput
  ) {
    updateStep(input: $input, condition: $condition) {
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
export const deleteStep = /* GraphQL */ `
  mutation DeleteStep(
    $input: DeleteStepInput!
    $condition: ModelStepConditionInput
  ) {
    deleteStep(input: $input, condition: $condition) {
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
export const createSubStep = /* GraphQL */ `
  mutation CreateSubStep(
    $input: CreateSubStepInput!
    $condition: ModelSubStepConditionInput
  ) {
    createSubStep(input: $input, condition: $condition) {
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
export const updateSubStep = /* GraphQL */ `
  mutation UpdateSubStep(
    $input: UpdateSubStepInput!
    $condition: ModelSubStepConditionInput
  ) {
    updateSubStep(input: $input, condition: $condition) {
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
export const deleteSubStep = /* GraphQL */ `
  mutation DeleteSubStep(
    $input: DeleteSubStepInput!
    $condition: ModelSubStepConditionInput
  ) {
    deleteSubStep(input: $input, condition: $condition) {
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
export const createFormField = /* GraphQL */ `
  mutation CreateFormField(
    $input: CreateFormFieldInput!
    $condition: ModelFormFieldConditionInput
  ) {
    createFormField(input: $input, condition: $condition) {
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
export const updateFormField = /* GraphQL */ `
  mutation UpdateFormField(
    $input: UpdateFormFieldInput!
    $condition: ModelFormFieldConditionInput
  ) {
    updateFormField(input: $input, condition: $condition) {
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
export const deleteFormField = /* GraphQL */ `
  mutation DeleteFormField(
    $input: DeleteFormFieldInput!
    $condition: ModelFormFieldConditionInput
  ) {
    deleteFormField(input: $input, condition: $condition) {
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
