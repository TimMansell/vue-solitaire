import { getUsersGames } from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getUserHistory = async (luid, params) => {
  const { error, response } = await getUsersGames(luid, params);

  if (!error) {
    const {
      user: { history },
    } = response;

    return history;
  }

  return [];
};
