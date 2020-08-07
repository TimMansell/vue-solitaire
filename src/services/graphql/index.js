import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

const graphql = () => {
  const newGame = async () => {
    try {
      const { data } = await apollo.mutate({
        mutation: gql`
          mutation {
            newGame {
              id
              gameNumber
            }
          }
        `,
      });

      return formatResponse(data.newGame);
    } catch (error) {
      return formatError();
    }
  };

  const updateGame = async (id, data) => {
    try {
      const { data: response } = await apollo.mutate({
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

      return formatResponse(response.updateGame);
    } catch (error) {
      return formatError();
    }
  };

  const getTotalGames = async () => {
    try {
      const { data } = await apollo.query({
        query: gql`
          query {
            totalGames {
              count
            }
          }
        `,
        fetchPolicy: 'no-cache',
      });

      return formatResponse(data.updateGame);
    } catch (error) {
      return formatError();
    }
  };

  return {
    newGame,
    updateGame,
    getTotalGames,
  };
};

export default graphql();
