import { GraphQLContext } from '../../util/types';

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      { participantIds }: { participantIds: Array<string> },
      context: GraphQLContext
    ) => {
      console.log('create convo with: ', participantIds);
    },
  },
};

export default resolvers;
