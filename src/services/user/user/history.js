import db from '@/services/db';

// eslint-disable-next-line import/prefer-default-export
export const getUsersGames = async (luid) => {
  const { error, response } = await db.getUsersGames(luid);

  const {
    user: { history },
  } = response;

  if (!error) {
    return history;
  }

  return [];
};
