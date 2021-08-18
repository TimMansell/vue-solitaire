import { formatDate } from '../../../../../helpers/dates';
import { formatTime, formatTimeFromDate } from '../../../../../helpers/times';
import { formatNumber } from '../../../../../helpers/numbers';
import { gameOutcome } from '../../../../../helpers/game';

export const formatLeaderboardGames = (games, players) =>
  games.map((item, index) => {
    const { uid, time, ...fields } = item;
    const { date } = fields;

    const player = players.find(({ uid: id }) => id === uid);

    const defaultItems = {
      ...fields,
      rank: index + 1,
      date: formatDate(date),
      player: player?.name,
    };

    if (time) {
      return {
        ...defaultItems,
        duration: formatTime(time),
      };
    }

    return defaultItems;
  });

export const formatHistoryGames = (games, offset, gamesPlayed) =>
  games.map(({ date, won, lost, time, moves }, index) => ({
    number: formatNumber(gamesPlayed - offset - index),
    date: formatDate(date),
    time: formatTimeFromDate(date),
    outcome: gameOutcome({ won, lost }),
    moves,
    duration: formatTime(time),
  }));
