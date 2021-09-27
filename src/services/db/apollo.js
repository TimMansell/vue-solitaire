import ApolloClient, { InMemoryCache } from 'apollo-boost';

export default new ApolloClient({
  uri: '/.netlify/functions/graphql',
  cache: new InMemoryCache({ addTypename: false }),
});
