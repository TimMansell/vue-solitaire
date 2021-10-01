export const insertIntoDb = async ({ client, collection, document }) => {
  const db = await client();

  return db.collection(collection).insertOne({ ...document });
};

export const countItemsInDb = async ({
  client,
  collection,
  findFields,
  returnFields,
}) => {
  const db = await client();

  return db
    .collection(collection)
    .find({ ...findFields }, { projection: { ...returnFields } })
    .count();
};

export const findAllItems = async ({
  client,
  collection,
  findFields,
  returnFields,
  sortBy = {},
}) => {
  const db = await client();

  return db
    .collection(collection)
    .find({ ...findFields }, { projection: { ...returnFields } })
    .sort({ ...sortBy })
    .toArray();
};

export const findItemsInDb = async ({
  client,
  collection,
  offset,
  limit,
  findFields,
  returnFields,
  sortBy,
}) => {
  const db = await client();

  return db
    .collection(collection)
    .find({ ...findFields }, { projection: { ...returnFields } })
    .skip(offset)
    .limit(limit)
    .sort({ ...sortBy })
    .toArray();
};

export const findItemInDb = async ({
  client,
  collection,
  findFields,
  returnFields,
}) => {
  const db = await client();

  return db
    .collection(collection)
    .findOne({ ...findFields }, { projection: { ...returnFields } });
};

export const deleteFromDb = async ({
  client,
  collection,
  findFields,
  sortBy,
}) => {
  const db = await client();

  return db
    .collection(collection)
    .findOneAndDelete({ ...findFields }, { sort: { ...sortBy } });
};

export const deleteAllFromDb = async ({ client, collection, document }) => {
  const db = await client();

  return db.collection(collection).deleteMany({ ...document });
};
