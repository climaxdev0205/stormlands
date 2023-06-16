/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onCreateUser(filter: $filter, username: $username) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onUpdateUser(filter: $filter, username: $username) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onDeleteUser(filter: $filter, username: $username) {
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
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onCreateProject(filter: $filter, owner: $owner) {
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
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onUpdateProject(filter: $filter, owner: $owner) {
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
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject(
    $filter: ModelSubscriptionProjectFilterInput
    $owner: String
  ) {
    onDeleteProject(filter: $filter, owner: $owner) {
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
export const onCreateVersion = /* GraphQL */ `
  subscription OnCreateVersion(
    $filter: ModelSubscriptionVersionFilterInput
    $owner: String
  ) {
    onCreateVersion(filter: $filter, owner: $owner) {
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
export const onUpdateVersion = /* GraphQL */ `
  subscription OnUpdateVersion(
    $filter: ModelSubscriptionVersionFilterInput
    $owner: String
  ) {
    onUpdateVersion(filter: $filter, owner: $owner) {
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
export const onDeleteVersion = /* GraphQL */ `
  subscription OnDeleteVersion(
    $filter: ModelSubscriptionVersionFilterInput
    $owner: String
  ) {
    onDeleteVersion(filter: $filter, owner: $owner) {
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
export const onCreateStep = /* GraphQL */ `
  subscription OnCreateStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onCreateStep(filter: $filter, owner: $owner) {
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
export const onUpdateStep = /* GraphQL */ `
  subscription OnUpdateStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onUpdateStep(filter: $filter, owner: $owner) {
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
export const onDeleteStep = /* GraphQL */ `
  subscription OnDeleteStep(
    $filter: ModelSubscriptionStepFilterInput
    $owner: String
  ) {
    onDeleteStep(filter: $filter, owner: $owner) {
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
export const onCreateSubStep = /* GraphQL */ `
  subscription OnCreateSubStep(
    $filter: ModelSubscriptionSubStepFilterInput
    $owner: String
  ) {
    onCreateSubStep(filter: $filter, owner: $owner) {
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
export const onUpdateSubStep = /* GraphQL */ `
  subscription OnUpdateSubStep(
    $filter: ModelSubscriptionSubStepFilterInput
    $owner: String
  ) {
    onUpdateSubStep(filter: $filter, owner: $owner) {
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
export const onDeleteSubStep = /* GraphQL */ `
  subscription OnDeleteSubStep(
    $filter: ModelSubscriptionSubStepFilterInput
    $owner: String
  ) {
    onDeleteSubStep(filter: $filter, owner: $owner) {
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
export const onCreateFormField = /* GraphQL */ `
  subscription OnCreateFormField(
    $filter: ModelSubscriptionFormFieldFilterInput
    $owner: String
  ) {
    onCreateFormField(filter: $filter, owner: $owner) {
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
export const onUpdateFormField = /* GraphQL */ `
  subscription OnUpdateFormField(
    $filter: ModelSubscriptionFormFieldFilterInput
    $owner: String
  ) {
    onUpdateFormField(filter: $filter, owner: $owner) {
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
export const onDeleteFormField = /* GraphQL */ `
  subscription OnDeleteFormField(
    $filter: ModelSubscriptionFormFieldFilterInput
    $owner: String
  ) {
    onDeleteFormField(filter: $filter, owner: $owner) {
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
