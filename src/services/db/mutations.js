import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const newUser = async (uid) => {
  try {
    const {
      data: { createUser },
    } = await apollo.mutate({
      mutation: gql`
        mutation CreateAUser($data: UserInput!) {
          createUser(data: $data) {
            uid
          }
        }
      `,
      variables: {
        data: {
          uid,
        },
      },
    });

    return formatResponse({ createUser });
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
    const {
      data: { wonGame },
    } = await apollo.mutate({
      mutation: gql`
        mutation WonAGame($data: GameInput!) {
          wonGame(data: $data) {
            uid
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse({ wonGame });
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
    const {
      data: { lostGame },
    } = await apollo.mutate({
      mutation: gql`
        mutation LostAGame($data: GameInput!) {
          lostGame(data: $data) {
            uid
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse({ lostGame });
  } catch (error) {
    return formatError();
  }
};

export const gameAbandoned = async ({ luid: uid, moves, time }) => {
  const data = {
    uid,
    moves,
    time,
  };

  try {
    const {
      data: { completedGame },
    } = await apollo.mutate({
      mutation: gql`
        mutation CompletedAGame($data: GameInput!) {
          completedGame(data: $data) {
            uid
          }
        }
      `,
      variables: {
        data,
      },
    });

    return formatResponse({ completedGame });
  } catch (error) {
    return formatError();
  }
};
