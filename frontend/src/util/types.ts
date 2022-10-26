/**
 * Users
 */

export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SeachUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

/**
 * Conversation
 */

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}
