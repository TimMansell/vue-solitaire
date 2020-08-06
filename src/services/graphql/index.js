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

  const updateGame = (id, data) =>
    apollo.mutate({
      mutation: gql`
        mutation UpdateAGame($id: ID!, $data: GameInput!) {
          updateGame(id: $id, data: $data) {
            date
          }
        }
      `,
      variables: {
        id,
        data,
      },
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
    updateGame,
    getTotalGames,
  };
};

export default graphql();
