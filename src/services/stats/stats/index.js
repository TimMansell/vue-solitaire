import { getStatsticsCount, getStatistics } from '@/services/db';

export const getStatsCount = async (luid) => {
  const { error, response } = await getStatsticsCount(luid);

  if (!error) {
    return response;
  }

  return {
    userStats: {},
    globalStats: {},
  };
};

export const getStats = async (luid) => {
  const { error, response } = await getStatistics(luid);

  if (!error) {
    return response;
  }

  return {
    userStats: {},
    globalStats: {},
  };
};
