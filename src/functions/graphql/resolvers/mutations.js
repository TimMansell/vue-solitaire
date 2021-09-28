import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { initCards, checkGameState } from '../../../services/solitaire';
import {
  insertIntoDb,
  findItemInDb,
  deleteFromDb,
  calculateTime,
} from './helpers';
import { createISODate } from '../../../helpers/dates';
import { gameOutcome } from '../../../helpers/game';

export const createUser = async (_, __, context) => {
  const { client, variables } = context;

  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

  await insertIntoDb({
    client,
    collection: 'users',
    document: { ...variables, name },
  });

  return { name };
};

export const newGame = async (_, __, context) => {
  const { client, variables } = context;

  const date = createISODate();
  const cards = initCards();

  await deleteFromDb({
    client,
    collection: 'decks',
    findFields: { ...variables },
    sortBy: { date: 1 },
  });

  insertIntoDb({
    client,
    collection: 'decks',
    document: { ...variables, date, cards },
  });

  return { cards };
};

export const saveGame = async (_, __, context) => {
  const { client, variables } = context;
  const { uid, moves, time, paused } = variables;

  const finishDate = createISODate();

  const { cards, date: startDate } = await findItemInDb({
    client,
    collection: 'decks',
    findFields: { uid },
    returnFields: { cards: 1, date: 1 },
  });

  const { isGameFinished, hasMoves } = checkGameState(moves, cards);
  const time2 = calculateTime(startDate, finishDate, paused);

  console.log({ time2, time });

  const game = {
    date: finishDate,
    ...variables,
    moves: moves.length,
    won: isGameFinished && !hasMoves,
    lost: !isGameFinished && !hasMoves,
    completed: true,
  };

  const outcome = gameOutcome(game);

  insertIntoDb({
    client,
    collection: 'games',
    document: { ...game },
  });

  deleteFromDb({
    client,
    collection: 'decks',
    findFields: { uid },
    sortBy: { date: 1 },
  });

  return { outcome };
};

export const mutations = {
  createUser,
  newGame,
  saveGame,
};
