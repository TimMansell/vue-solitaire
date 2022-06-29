export const insertIntoDb = async (client, collection, document) => {
  const db = await client();

  return db.collection(collection).insertOne({ ...document });
};

export const countItemsInDb = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields } = params;

  return db.collection(collection).find(findFields, returnFields).count();
};

export const findAllItems = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields, sortBy } = params;

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .sort(sortBy)
    .toArray();
};

export const findItemsInDb = async (client, collection, params) => {
  const db = await client();

  const { offset, limit, findFields, returnFields, sortBy } = params;

  return db
    .collection(collection)
    .find(findFields, returnFields)
    .skip(offset)
    .limit(limit)
    .sort(sortBy)
    .toArray();
};

export const findItemInDb = async (client, collection, params) => {
  const db = await client();

  const { findFields, returnFields } = params;

  return db.collection(collection).findOne(findFields, returnFields);
};
