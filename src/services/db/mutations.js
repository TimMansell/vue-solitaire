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
