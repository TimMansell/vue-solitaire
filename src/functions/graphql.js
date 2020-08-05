import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { client, formatQuery } from './graphql/db';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { client, formatQuery };
  },
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler();
