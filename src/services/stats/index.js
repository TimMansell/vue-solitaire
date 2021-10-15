import { formatTime } from '@/helpers/times';
import { formatNumber, formatPercent } from '@/helpers/numbers';
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
      date,
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
    date,
    time: date,
    outcome: gameOutcome({ won, lost }),
    moves,
    duration: formatTime(time),
  }));

export const formatStats = ({ completed, won, lost }) => {
  const abandoned = completed - won - lost;

  const completedCount = formatNumber(completed);
  const wonCount = formatNumber(won);
  const lostCount = formatNumber(lost);
  const abandonedCount = formatNumber(abandoned);

  const wonPercent = formatPercent(won / completed);
  const lostPercent = formatPercent(lost / completed);
  const abandonedPercent = formatPercent(abandoned / completed);

  const stats = [
    [completedCount, wonCount, lostCount, abandonedCount],
    ['', wonPercent, lostPercent, abandonedPercent],
  ];

  return stats;
};
