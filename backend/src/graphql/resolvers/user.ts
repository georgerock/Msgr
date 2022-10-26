import { User } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { CreateUsernameResponse, GraphQLContext } from '../../util/types';

const resolvers = {
  Query: {
    searchUsers: async (
      _: any,
      { username }: { username: string },
      { session, prisma }: GraphQLContext
    ): Promise<User[]> => {
      if (!session?.user) {
        throw new ApolloError('Not authorized');
      }

      const {
        user: { username: me },
      } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            username: { contains: username, not: me, mode: 'insensitive' },
          },
        });

        return users;
      } catch (err: any) {
        console.error('searchUsersError', err);
        throw new ApolloError(err?.message);
      }
    },
  },
  Mutation: {
    createUsername: async (
      _: any,
      { username }: { username: string },
      { session, prisma }: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      if (!session?.user) {
        return {
          error: 'Not authorized',
        };
      }

      const { id } = session.user;

      try {
        // is the username already taken?
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          return {
            error: 'Username already taken',
          };
        }

        // update the user

        await prisma.user.update({ where: { id }, data: { username } });
        return { success: true };
      } catch (err: any) {
        console.error(err);
        return {
          error: err.message,
        };
      }
    },
  },
};

export default resolvers;
