import { gql } from 'apollo-boost';
import apollo from './apollo';

export const createUser = async (uid) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation CreateAUser($uid: String!) {
          createUser(uid: $uid) {
            name
            exists
          }
        }
      `,
      variables: {
        uid,
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
        mutation NewGame($uid: String!) {
          newGame(uid: $uid) {
            date
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
        uid,
      },
    });

    return response.data.newGame;
  } catch (error) {
    return { date: '', cards: [] };
  }
};

export const saveGame = async (uid, { moves, times }) => {
  // const filteredTimes = times.filter(({ isGamePaused }) => !isGamePaused);

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation SaveGame(
          $uid: String!
          $moves: [moveInput!]!
          $times: [timeInput!]!
        ) {
          saveGame(uid: $uid, moves: $moves, times: $times) {
            outcome
          }
        }
      `,
      variables: {
        uid,
        moves,
        times,
      },
    });

    return response.data.saveGame;
  } catch (error) {
    return { outcome: '' };
  }
};

export const pauseGame = async (uid, isGamePaused) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation PauseGame($uid: String!, $isGamePaused: Boolean!) {
          pauseGame(uid: $uid, isGamePaused: $isGamePaused) {
            saved
          }
        }
      `,
      variables: {
        uid,
        isGamePaused,
      },
    });

    return response.data.pauseGame;
  } catch (error) {
    return { saved: '' };
  }
};
