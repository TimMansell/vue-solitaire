import { gql } from 'apollo-boost';
import apollo from './apollo';

const graphql = () => {
  const newGame = () =>
    apollo.mutate({
      mutation: gql`
        mutation {
          newGame {
            id
            gameNumber
          }
        }
      `,
    });

  const updateGame = (id, data) =>
    apollo.mutate({
      mutation: gql`
        mutation UpdateAGame($id: ID!, $data: GameInput!) {
          updateGame(id: $id, data: $data) {
            id
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
      fetchPolicy: 'no-cache',
    });

  return {
    newGame,
    updateGame,
    getTotalGames,
  };
};

export default graphql();
