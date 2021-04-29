import { MongoClient } from 'mongodb';
import 'dotenv/config';

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;

let cachedDb = null;

// eslint-disable-next-line import/prefer-default-export
export const client = async () => {
  if (cachedDb) return cachedDb;

  const connection = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = connection.db(MONGODB_DB);

  return cachedDb;
};
