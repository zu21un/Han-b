/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      name
      alarmTime
      email
      password
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      name
      alarmTime
      email
      password
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      name
      alarmTime
      email
      password
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
export const onCreateUserKeyword = /* GraphQL */ `
  subscription OnCreateUserKeyword {
    onCreateUserKeyword {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        password
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
export const onUpdateUserKeyword = /* GraphQL */ `
  subscription OnUpdateUserKeyword {
    onUpdateUserKeyword {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        password
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
export const onDeleteUserKeyword = /* GraphQL */ `
  subscription OnDeleteUserKeyword {
    onDeleteUserKeyword {
      id
      userId
      keywordId
      user {
        id
        name
        alarmTime
        email
        password
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      name
      content
      link
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      name
      content
      link
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      name
      content
      link
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
export const onCreateNotiKeyword = /* GraphQL */ `
  subscription OnCreateNotiKeyword {
    onCreateNotiKeyword {
      id
      notiId
      keywordId
      noti {
        id
        name
        content
        link
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
export const onUpdateNotiKeyword = /* GraphQL */ `
  subscription OnUpdateNotiKeyword {
    onUpdateNotiKeyword {
      id
      notiId
      keywordId
      noti {
        id
        name
        content
        link
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
export const onDeleteNotiKeyword = /* GraphQL */ `
  subscription OnDeleteNotiKeyword {
    onDeleteNotiKeyword {
      id
      notiId
      keywordId
      noti {
        id
        name
        content
        link
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
export const onCreateKeyword = /* GraphQL */ `
  subscription OnCreateKeyword {
    onCreateKeyword {
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
export const onUpdateKeyword = /* GraphQL */ `
  subscription OnUpdateKeyword {
    onUpdateKeyword {
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
export const onDeleteKeyword = /* GraphQL */ `
  subscription OnDeleteKeyword {
    onDeleteKeyword {
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
export const onCreateOrganization = /* GraphQL */ `
  subscription OnCreateOrganization {
    onCreateOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganization = /* GraphQL */ `
  subscription OnUpdateOrganization {
    onUpdateOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganization = /* GraphQL */ `
  subscription OnDeleteOrganization {
    onDeleteOrganization {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
