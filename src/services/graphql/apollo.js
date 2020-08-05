import ApolloClient from 'apollo-boost';

const { VUE_APP_GRAPHQL_URL } = process.env;

export default new ApolloClient({
  uri: VUE_APP_GRAPHQL_URL,
});
