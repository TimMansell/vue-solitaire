import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { client, formatQuery } from './graphql/db';

const { FAUNA_INTROSPECTION, FAUNA_PLAYGROUND, APOLLO_SERVER_CORS_ENABLED } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { client, formatQuery };
  },
  playground: FAUNA_PLAYGROUND,
  introspection: FAUNA_INTROSPECTION,
});

const cors = APOLLO_SERVER_CORS_ENABLED
  ? {
      cors: {
        origin: '*',
        credentials: true,
      },
    }
  : {};

const options = {
  ...cors,
};

exports.handler = server.createHandler(options);
