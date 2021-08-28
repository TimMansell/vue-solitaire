import { getUsersGames } from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getUserHistory = async (luid, params) => {
  const { error, response } = await getUsersGames(luid, params);

  if (!error) {
    return response;
  }

  return [];
};
