import ApolloClient, { InMemoryCache } from 'apollo-boost';

const { VITE_GRAPHQL_URL } = import.meta.env;

export default new ApolloClient({
  uri: VITE_GRAPHQL_URL,
  cache: new InMemoryCache({ addTypename: false }),
});
