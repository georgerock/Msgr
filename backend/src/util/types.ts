import { ISODateString } from 'next-auth';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}

/**
 * Users
 */

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface Session {
  user: User;
  expires: ISODateString;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
}
