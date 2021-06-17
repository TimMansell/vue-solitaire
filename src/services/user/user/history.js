import db from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getUsersGames = async (luid, params) => {
  const { error, response } = await db.getUsersGames(luid, params);

  const {
    user: { history },
  } = response;

  if (!error) {
    return history;
  }

  return [];
};
