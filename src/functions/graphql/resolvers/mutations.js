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

  insertIntoDb(client, 'decks', { uid, date, cards });

  return { cards };
};

export const saveGame = async (_, __, { client, variables }) => {
  const { uid, moves } = variables;
  const date = createISODate();

  const { cards } = await findItemInDb(client, 'decks', {
    findFields: { uid },
    returnFields: {
      projection: { cards: 1 },
    },
  });

  const { isGameFinished, hasMoves } = checkGameState(moves, cards);

  const game = {
    ...variables,
    moves: moves.length,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  };

  const outcome = gameOutcome(game);

  const document = { date, ...game };

  insertIntoDb(client, 'games', document);
  deleteFromDb(client, 'decks', { uid });

  return { outcome };
};

export const mutations = {
  createUser,
  newGame,
  saveGame,
};
