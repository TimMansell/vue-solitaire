import { gql } from 'apollo-boost';
import apollo from './apollo';

const graphql = () => {
  const newGame = () =>
    apollo.mutate({
      mutation: gql`
        mutation {
          createGame {
            id
          }
        }
      `,
    });

  const getTotalGames = () =>
    apollo.query({
      query: gql`
        query {
          totalGames {
            count
          }
        }
      `,
      fetchPolicy: 'network-only',
    });

  return {
    newGame,
    getTotalGames,
  };
};

export default graphql();
