import { Prisma } from '@prisma/client';
import { ApolloError } from 'apollo-server-core';
import { ConversationPopulated, GraphQLContext } from '../../util/types';

const resolvers = {
  Query: {
    conversations: async (
      _: any,
      __: any,
      { session, prisma }: GraphQLContext
    ): Promise<Array<ConversationPopulated>> => {
      if (!session?.user) {
        throw new ApolloError('Not authorized');
      }

      const {
        user: { id: me },
      } = session;

      try {
        const allConvos = await prisma.conversation.findMany({
          // This where clause does not return the expected result. We filter insted
          // This bug has been confirmd by the prisma team, seems mongo specific.
          // where: {
          //   participants: {
          //     some: {
          //       userId: {
          //         equals: me
          //       }
          //     }
          //   }
          // },
          include: conversationPopulated,
        });

        return allConvos.filter(
          (c) => !!c.participants.find((p) => p.userId === me)
        );
      } catch (err: any) {
        console.error('getConversations error: ', err);
        throw new ApolloError('Unable to get conversations');
      }
    },
  },
  Mutation: {
    createConversation: async (
      _: any,
      { participantIds }: { participantIds: Array<string> },
      { session, prisma }: GraphQLContext
    ): Promise<{ conversationId: string }> => {
      if (!session?.user) {
        throw new ApolloError('Not authorized');
      }

      const {
        user: { id: userId },
      } = session;

      try {
        const conversation = await prisma.conversation.create({
          data: {
            participants: {
              createMany: {
                data: participantIds.map((pId) => ({
                  userId: pId,
                  seenLatest: pId === userId,
                })),
              },
            },
          },
          include: conversationPopulated,
        });

        //TODO: emit a conversation_created event using pubsub

        return { conversationId: conversation.id };
      } catch (err: any) {
        console.error('createConversation error: ', err);
        throw new ApolloError('Error creating conversation');
      }
    },
  },
};

export default resolvers;

export const participantPopulated =
  Prisma.validator<Prisma.ConversationParticipantInclude>()({
    user: {
      select: {
        id: true,
        username: true,
        image: true,
      },
    },
  });

export const conversationPopulated =
  Prisma.validator<Prisma.ConversationInclude>()({
    participants: {
      include: participantPopulated,
    },
    latestMsg: {
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            image: true,
          },
        },
      },
    },
  });
