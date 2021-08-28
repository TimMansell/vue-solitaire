import { getLeaderboards } from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getLeaderboard = async (params) => {
  const { error, response } = await getLeaderboards(params);

  if (!error) {
    return response;
  }

  return [];
};
