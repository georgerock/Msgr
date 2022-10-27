import { gql } from '@apollo/client';

const ConversationFields = `
  conversations {
    id
    participants {
      user {
        id
        username
        image
      }
      seenLatest
    }
    latestMessage {
      id
      sender {
        id
        username
        image
      }
      body
      createdAt
    }
    updatedAt
  }
`;

export default {
  Queries: {
    conevrsations: gql`
      query Conversations{
        ${ConversationFields}
      }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
