import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const newGame = async () => {
  try {
    const { data } = await apollo.mutate({
      mutation: gql`
        mutation {
          newGame {
            _id
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

export const gameWon = async (id, data) => {
  try {
    const { data: response } = await apollo.mutate({
      mutation: gql`
        mutation WonAGame($id: ID!, $data: GameInput!) {
          wonGame(id: $id, data: $data) {
            _id
          }
        }
      `,
      variables: {
        id,
        data,
      },
    });

    return formatResponse(response.wonGame);
  } catch (error) {
    return formatError();
  }
};

export const gameLost = async (id, data) => {
  try {
    const { data: response } = await apollo.mutate({
      mutation: gql`
        mutation LostAGame($id: ID!, $data: GameInput!) {
          lostGame(id: $id, data: $data) {
            _id
          }
        }
      `,
      variables: {
        id,
        data,
      },
    });

    return formatResponse(response.lostGame);
  } catch (error) {
    return formatError();
  }
};

export const gameCompleted = async (id, data) => {
  try {
    const { data: response } = await apollo.mutate({
      mutation: gql`
        mutation CompletedAGame($id: ID!, $data: GameInput!) {
          completedGame(id: $id, data: $data) {
            _id
          }
        }
      `,
      variables: {
        id,
        data,
      },
    });

    return formatResponse(response.completedGame);
  } catch (error) {
    return formatError();
  }
};

export const getTotalGames = async () => {
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

    return formatResponse(data.totalGames);
  } catch (error) {
    return formatError();
  }
};
