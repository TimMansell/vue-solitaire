import { gql } from 'apollo-boost';
import apollo from './apollo';
import { formatError, formatResponse } from './helpers';

export const newUser = async (uid) => {
  try {
    const {
      // data: { createUser },
      data,
    } = await apollo.mutate({
      mutation: gql`
        mutation CreateAUser($data: UserInput!) {
          createUser(data: $data) {
            _id
          }
        }
      `,
      variables: {
        data: {
          uid,
        },
      },
    });

    // return formatResponse({ createUser });
    return formatResponse(data.createUser);
  } catch (error) {
    return formatError();
  }
};

export const gameNew = async (uid) => {
  try {
    const {
      // data: { newGame },
      data,
    } = await apollo.mutate({
      mutation: gql`
        mutation NewGame($uid: String!) {
          newGame(uid: $uid) {
            _id
          }
        }
      `,
      variables: {
        uid,
      },
    });

    // return formatResponse({ newGame });
    return formatResponse(data.newGame);
  } catch (error) {
    return formatError();
  }
};

export const gameWon = async ({ id, moves, time }) => {
  const data = {
    moves,
    time,
  };

  try {
    const {
      // data: { wonGame },
      data: response,
    } = await apollo.mutate({
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

    // return formatResponse({ wonGame });
    return formatResponse(response.wonGame);
  } catch (error) {
    return formatError();
  }
};

export const gameLost = async ({ id, moves, time }) => {
  const data = {
    moves,
    time,
  };

  try {
    const {
      // data: { lostGame },
      data: response,
    } = await apollo.mutate({
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

    // return formatResponse({ lostGame });
    return formatResponse(response.lostGame);
  } catch (error) {
    return formatError();
  }
};

export const gameCompleted = async ({ id, moves, time }) => {
  const data = {
    moves,
    time,
  };

  try {
    const {
      // data: { completedGame },
      data: response,
    } = await apollo.mutate({
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

    // return formatResponse({ completedGame });
    return formatResponse(response.completedGame);
  } catch (error) {
    return formatError();
  }
};
