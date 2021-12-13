/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      alarmTime
      email
      keywords {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      alarmTime
      email
      keywords {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
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
      name
      alarmTime
      email
      keywords {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUserKeyword = /* GraphQL */ `
  mutation CreateUserKeyword(
    $input: CreateUserKeywordInput!
    $condition: ModelUserKeywordConditionInput
  ) {
    createUserKeyword(input: $input, condition: $condition) {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUserKeyword = /* GraphQL */ `
  mutation UpdateUserKeyword(
    $input: UpdateUserKeywordInput!
    $condition: ModelUserKeywordConditionInput
  ) {
    updateUserKeyword(input: $input, condition: $condition) {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserKeyword = /* GraphQL */ `
  mutation DeleteUserKeyword(
    $input: DeleteUserKeywordInput!
    $condition: ModelUserKeywordConditionInput
  ) {
    deleteUserKeyword(input: $input, condition: $condition) {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      name
      link
      date
      orgId
      organization {
        id
        name
        createdAt
        updatedAt
      }
      keywords {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      name
      link
      date
      orgId
      organization {
        id
        name
        createdAt
        updatedAt
      }
      keywords {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      name
      link
      date
      orgId
      organization {
        id
        name
        createdAt
        updatedAt
      }
      keywords {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createNotiKeyword = /* GraphQL */ `
  mutation CreateNotiKeyword(
    $input: CreateNotiKeywordInput!
    $condition: ModelNotiKeywordConditionInput
  ) {
    createNotiKeyword(input: $input, condition: $condition) {
      id
      notiId
      keywordId
      noti {
        id
        name
        link
        date
        orgId
        organization {
          id
          name
          createdAt
          updatedAt
        }
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateNotiKeyword = /* GraphQL */ `
  mutation UpdateNotiKeyword(
    $input: UpdateNotiKeywordInput!
    $condition: ModelNotiKeywordConditionInput
  ) {
    updateNotiKeyword(input: $input, condition: $condition) {
      id
      notiId
      keywordId
      noti {
        id
        name
        link
        date
        orgId
        organization {
          id
          name
          createdAt
          updatedAt
        }
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotiKeyword = /* GraphQL */ `
  mutation DeleteNotiKeyword(
    $input: DeleteNotiKeywordInput!
    $condition: ModelNotiKeywordConditionInput
  ) {
    deleteNotiKeyword(input: $input, condition: $condition) {
      id
      notiId
      keywordId
      noti {
        id
        name
        link
        date
        orgId
        organization {
          id
          name
          createdAt
          updatedAt
        }
        keywords {
          nextToken
        }
        createdAt
        updatedAt
      }
      keyword {
        id
        name
        users {
          nextToken
        }
        notis {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createKeyword = /* GraphQL */ `
  mutation CreateKeyword(
    $input: CreateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    createKeyword(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      notis {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateKeyword = /* GraphQL */ `
  mutation UpdateKeyword(
    $input: UpdateKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    updateKeyword(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      notis {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteKeyword = /* GraphQL */ `
  mutation DeleteKeyword(
    $input: DeleteKeywordInput!
    $condition: ModelKeywordConditionInput
  ) {
    deleteKeyword(input: $input, condition: $condition) {
      id
      name
      users {
        items {
          id
          userId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      notis {
        items {
          id
          notiId
          keywordId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createOrganization = /* GraphQL */ `
  mutation CreateOrganization(
    $input: CreateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    createOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateOrganization = /* GraphQL */ `
  mutation UpdateOrganization(
    $input: UpdateOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    updateOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrganization = /* GraphQL */ `
  mutation DeleteOrganization(
    $input: DeleteOrganizationInput!
    $condition: ModelOrganizationConditionInput
  ) {
    deleteOrganization(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
