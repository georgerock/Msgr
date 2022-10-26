import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLContext } from './util/types';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import http from 'http';
import typeDefs from './graphql/typedefs';
import resolvers from './graphql/resolvers';
import dotenv from 'dotenv';
import { Session } from './util/types';

const startApolloServer = async () => {
  dotenv.config();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const corsOpts = {
    origin: process.env.CLIENT_ORIGIN as string,
    credentials: true,
  };

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    context: async ({ req, res }): Promise<GraphQLContext> => {
      const session = (await getSession({ req })) as Session;
      const prisma = new PrismaClient();
      return { session, prisma };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app, cors: corsOpts });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
};

startApolloServer().catch((err) => console.error(err));
