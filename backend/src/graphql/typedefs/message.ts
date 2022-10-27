import { gql } from 'apollo-server-core';

const typeDefs = gql`
  type Message {
    id: String
    sender: User
    body: String
    createdAt: Date
    updatedAt: Date
  }
`;

export default typeDefs;
