import { gql } from 'apollo-boost';
import apollo from './apollo';

export const createUser = async (uid) => {
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

    return response.data.createUser;
  } catch (error) {
    return { name: '' };
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

    return response.data.newGame;
  } catch (error) {
    return { cards: [] };
  }
};

export const saveGame = async (uid, { moves, time }) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation SaveGame($uid: String!, $moves: [moveInput!]!, $time: Int!) {
          saveGame(uid: $uid, moves: $moves, time: $time) {
            outcome
          }
        }
      `,
      variables: {
        uid,
        moves,
        time,
      },
    });

    return response.data.saveGame;
  } catch (error) {
    return { outcome: '' };
  }
};

export const pauseGame = async (uid, isPaused) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation PauseGame($uid: String!, $isPaused: Boolean!) {
          pauseGame(uid: $uid, isPaused: $isPaused) {
            type
          }
        }
      `,
      variables: {
        uid,
        isPaused,
      },
    });

    return response.data.pauseGame;
  } catch (error) {
    return {};
  }
};
