import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator';

export const createUser = async (db, uid) => {
  const name = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '',
    style: 'capital',
  });

  db.collection('users').insertOne({ uid, name });

  return name;
};

export const getUser = async (db, uid) => {
  const user = await db
    .collection('users')
    .findOne({ uid }, { projection: { name: 1 } });

  return user?.name;
};
