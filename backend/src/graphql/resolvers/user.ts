const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: () => {
      console.log('hey');
    },
  },
};

export default resolvers;
