import { ISODateString } from 'next-auth';
import { Prisma, PrismaClient } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Context } from 'graphql-ws/lib/server';
import {
  conversationPopulated,
  participantPopulated,
} from '../graphql/resolvers/conversation';

/**
 * Server config
 */

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}

export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

export interface Session {
  user: User;
  expires: ISODateString;
}
/**
 * Users
 */

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
}

/**
 * Conversations
 */

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantGetPayload<{
  include: typeof participantPopulated;
}>;
