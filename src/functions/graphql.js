import { ApolloServer } from 'apollo-server-lambda';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { client } from './graphql/db';
import { options } from './graphql/apollo';

const { FAUNA_INTROSPECTION, FAUNA_PLAYGROUND } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context() {
    return { client };
  },
  playground: FAUNA_PLAYGROUND,
  introspection: FAUNA_INTROSPECTION,
});

exports.handler = server.createHandler(options);
