/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      alarmTime
      email
      keyword {
        items {
          id
          userId
          keywordId
          keyword{
            id
            name
          }
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        alarmTime
        email
        keyword {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserKeyword = /* GraphQL */ `
  query GetUserKeyword($id: ID!) {
    getUserKeyword(id: $id) {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        keyword {
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
export const listUserKeywords = /* GraphQL */ `
  query ListUserKeywords(
    $filter: ModelUserKeywordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        keywordId
        user {
          id
          name
          alarmTime
          email
          createdAt
          updatedAt
        }
        keyword {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      name
      content
      link
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        content
        link
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
      nextToken
    }
  }
`;
export const getNotiKeyword = /* GraphQL */ `
  query GetNotiKeyword($id: ID!) {
    getNotiKeyword(id: $id) {
      id
      notiId
      keywordId
      noti {
        id
        name
        content
        link
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
export const listNotiKeywords = /* GraphQL */ `
  query ListNotiKeywords(
    $filter: ModelNotiKeywordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotiKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        notiId
        keywordId
        noti {
          id
          name
          content
          link
          createdAt
          updatedAt
        }
        keyword {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getKeyword = /* GraphQL */ `
  query GetKeyword($id: ID!) {
    getKeyword(id: $id) {
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
export const listKeywords = /* GraphQL */ `
  query ListKeywords(
    $filter: ModelKeywordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listKeywords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOrganization = /* GraphQL */ `
  query GetOrganization($id: ID!) {
    getOrganization(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listOrganizations = /* GraphQL */ `
  query ListOrganizations(
    $filter: ModelOrganizationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganizations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
