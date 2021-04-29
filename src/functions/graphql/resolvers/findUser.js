export const exists = async ({ uid }, __, { client }) => {
  const db = await client();

  const existsQuery = await db
    .collection('users')
    .find({ uid }, { projection: { uid: 1 } });

  return existsQuery.count() > 0;
};

export const findUser = {
  exists,
};
