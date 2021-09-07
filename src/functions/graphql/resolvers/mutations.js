import { initCards, checkGameState } from '../../../services/solitaire';
import {
  createPlayerName,
  insertIntoDb,
  findAllItems,
  findItemInDb,
  deleteFromDb,
} from './helpers';
import { createISODate } from '../../../helpers/dates';
import { gameOutcome } from '../../../helpers/game';

export const createUser = async (_, __, { client, variables }) => {
  const {
    data: { uid },
  } = variables;

  const playerNamesInUse = await findAllItems(client, 'users', {
    findFields: {},
    returnFields: {
      projection: { name: 1 },
    },
  });

  const name = createPlayerName(playerNamesInUse);

  const document = { uid, name };

  await insertIntoDb(client, 'users', document);

  return { name };
};

export const newGame = async (_, __, { client, variables }) => {
  const { uid } = variables;

  const date = createISODate();
  const cards = initCards();

  deleteFromDb(client, 'decks', uid);
  insertIntoDb(client, 'decks', { uid, date, cards });

  return { cards };
};

export const saveGame = async (_, __, { client, variables }) => {
  const { uid, moves } = variables;
  const date = createISODate();

  const deck = await findItemInDb(client, 'decks', {
    findFields: { uid },
    returnFields: {
      projection: { cards: 1 },
    },
  });

  const { isGameFinished, hasMoves } = checkGameState(moves, deck);

  const game = {
    ...variables,
    moves: moves.length,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  };

  const outcome = gameOutcome(game);

  const document = { date, ...game };

  console.log({ document });

  insertIntoDb(client, 'games', document);

  return { outcome };
};

export const wonGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ won: true });

  const document = { date, ...data, won: true, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const lostGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ lost: true });

  const document = { date, ...data, won: false, lost: true, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const quitGame = async (_, __, { client, variables }) => {
  const { data } = variables;
  const date = createISODate();
  const outcome = gameOutcome({ completed: true });

  const document = { date, ...data, won: false, lost: false, completed: true };

  await insertIntoDb(client, 'games', document);

  return { outcome };
};

export const mutations = {
  createUser,
  newGame,
  saveGame,
  wonGame,
  lostGame,
  quitGame,
};
