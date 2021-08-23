import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const newUser = async (uid) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation CreateAUser($data: UserInput!) {
          createUser(data: $data) {
            name
          }
        }
      `,
      variables: {
        data: {
          uid,
        },
      },
    });

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const newGame = async (uid) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation NewGame($data: UserInput!) {
          newGame(data: $data) {
            cards {
              id
              value
              order
              suit
            }
          }
        }
      `,
      variables: {
        data: {
          uid,
        },
      },
    });

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const gameWon = async ({ luid: uid, moves, time }) => {
  const data = {
    uid,
    moves,
    time,
  };

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation WonAGame($data: GameInput!) {
          wonGame(data: $data) {
            outcome
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const gameLost = async ({ luid: uid, moves, time }) => {
  const data = {
    uid,
    moves,
    time,
  };

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation LostAGame($data: GameInput!) {
          lostGame(data: $data) {
            outcome
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};

export const gameQuit = async ({ luid: uid, moves, time }) => {
  const data = {
    uid,
    moves,
    time,
  };

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation CompletedAGame($data: GameInput!) {
          quitGame(data: $data) {
            outcome
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse(response);
  } catch (error) {
    return formatError();
  }
};
