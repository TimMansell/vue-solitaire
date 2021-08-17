import db from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getUsersGames = async (luid, params) => {
  const { error, response } = await db.getUsersGames(luid, params);

  if (!error) {
    const {
      user: { history },
    } = response;

    return history;
  }

  return [];
};
