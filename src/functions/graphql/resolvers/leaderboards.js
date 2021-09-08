import { findLeaderboardItems } from './helpers';

export const moves = (parent, _, context) =>
  findLeaderboardItems({ context, parent, find: 'moves' });

export const times = (parent, _, context) =>
  findLeaderboardItems({ context, parent, find: 'time' });

export const leaderboards = {
  moves,
  times,
};
