import { findLeaderboardItems } from './helpers';

export const moves = async (parent, _, context) => {
  const { client } = context;
  const find = 'moves';

  const items = await findLeaderboardItems(client, parent, find);

  return items;
};

export const times = async (parent, _, context) => {
  const { client } = context;
  const find = 'time';

  const items = await findLeaderboardItems(client, parent, find);

  return items;
};

export const leaderboards = {
  moves,
  times,
};
