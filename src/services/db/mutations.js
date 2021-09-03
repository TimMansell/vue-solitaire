import { gql } from 'apollo-boost';
import apollo from './apollo';
import { saveGameQuery } from './helpers';

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

export const saveGame = async (uid, game, gameStatus) => {
  const { moves, time } = game;
  const numberOfMoves = moves.length;

  const data = {
    uid,
    moves: numberOfMoves,
    time,
  };

  const query = saveGameQuery(gameStatus);

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation WonAGame($data: GameInput!) {
          ${query}(data: $data) {
            outcome
          }
        }
      `,
      variables: {
        data,
      },
    });

    return response.data[query];
  } catch (error) {
    return { outcome: '' };
  }
};

export const moveCard = async (uid, card, move) => {
  const { value, suit } = card;

  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation MoveCard($uid: String!, $move: moveInput!) {
          moveCard(uid: $uid, move: $move) {
            selectedColumn
            type
            value
            suit
          }
        }
      `,
      variables: {
        uid,
        move: {
          ...move,
          value,
          suit,
        },
      },
    });

    return response.data.moveCard;
  } catch (error) {
    return {};
  }
};

export const pauseGame = async (uid) => {
  try {
    const response = await apollo.mutate({
      mutation: gql`
        mutation PauseGame($uid: String!) {
          pauseGame(uid: $uid) {
            type
          }
        }
      `,
      variables: {
        uid,
      },
    });

    return response.data.pauseGame;
  } catch (error) {
    return {};
  }
};
