import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';
import { formatHistoryGames } from '@/services/stats';

export const createUser = async (db, uid) => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

  db.collection('users').insertOne({ uid, name });

  return name;
};

export const getUser = async (db, uid) => {
  const user = await db
    .collection('users')
    .findOne({ uid }, { projection: { name: 1 } });

  return user?.name;
};

export const getGames = async (db, uid, offset, limit) => {
  const findGames = db
    .collection('games')
    .find(
      { uid },
      { projection: { date: 1, won: 1, lost: 1, time: 1, moves: 1 } }
    )
    .skip(offset)
    .limit(limit)
    .sort({ date: -1 })
    .toArray();

  const findGamesPlayed = db
    .collection('games')
    .find({ uid }, { projection: { date: 1 } })
    .count();

  const [games, gamesPlayed] = await Promise.all([findGames, findGamesPlayed]);

  const formattedGames = formatHistoryGames(games, gamesPlayed, offset);

  return formattedGames;
};
