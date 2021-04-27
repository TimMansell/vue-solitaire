export const exists = async ({ uid }, __, { client }) => {
  const db = await client();

  console.log({ uid });

  const existsQuery = await db
    .collection('user')
    .find({ uid }, { projection: { uid: 1 } })
    .toArray();

  return existsQuery.length > 0;
};

export const findUser = {
  exists,
};
