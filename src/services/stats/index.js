import { formatDate } from '@/helpers/dates';
import { formatTime, formatTimeFromDate } from '@/helpers/times';
import { formatNumber } from '@/helpers/numbers';
import { gameOutcome } from '@/helpers/game';

export const getLeaderboadSortBy = (showBest) => {
  if (showBest === 'times') {
    return 'time';
  }

  return 'moves';
};

export const formatLeaderboardGames = (games, players, sortBy) =>
  games.map((item, index) => {
    const { uid, date, time, moves } = item;

    const player = players.find(({ uid: id }) => id === uid);

    const defaultItems = {
      rank: index + 1,
      date: formatDate(date),
      player: player?.name ?? 'Unknown Player',
    };

    if (sortBy === 'moves') {
      return {
        ...defaultItems,
        moves,
      };
    }

    if (sortBy === 'time') {
      return {
        ...defaultItems,
        duration: formatTime(time),
      };
    }

    return defaultItems;
  });

export const formatHistoryGames = (games, gamesPlayed, offset) =>
  games.map(({ date, won, lost, time, moves }, index) => ({
    number: formatNumber(gamesPlayed - offset - index),
    date: formatDate(date),
    time: formatTimeFromDate(date),
    outcome: gameOutcome({ won, lost }),
    moves,
    duration: formatTime(time),
  }));
