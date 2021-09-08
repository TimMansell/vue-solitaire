import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

import { findItemInDb } from './db';

// eslint-disable-next-line import/prefer-default-export
export const createPlayerName = async (client) => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

  const isPlayerNameInUse = await findItemInDb(client, 'users', {
    findFields: { name },
    returnFields: {
      projection: { name: 1 },
    },
  });

  if (isPlayerNameInUse) {
    return createPlayerName();
  }

  return name;
};
