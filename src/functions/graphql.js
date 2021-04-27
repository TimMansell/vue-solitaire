import { ApolloServer } from 'apollo-server-lambda';
import depthLimit from 'graphql-depth-limit';
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { client } from './graphql/db';
import { grabQuery, grabVariables } from './graphql/helpers';

const { FAUNA_INTROSPECTION, FAUNA_PLAYGROUND, NODE_ENV } = process.env;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context({ event, context }) {
    const query = grabQuery(event);
    const variables = grabVariables(event);

    // eslint-disable-next-line no-param-reassign
    context.callbackWaitsForEmptyEventLoop = false;

    return { client, query, variables };
  },
  playground: FAUNA_PLAYGROUND,
  introspection: FAUNA_INTROSPECTION,
  validationRules: [depthLimit(1)],
  mocks: NODE_ENV !== 'production',
});

exports.handler = server.createHandler();
