const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const uri = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  on('task', {
    populateDeck(deck) {
      const [cards, uid] = deck;

      return new Promise((resolve) => {
        MongoClient.connect(uri, async (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`);

            throw err;
          } else {
            const db = client.db(MONGODB_DB);

            await db.collection('decks').deleteMany({ uid });
            await db.collection('decks').insertOne({ uid, cards });

            client.close();

            resolve({});
          }
        });
      });
    },
    clearUser(uid) {
      return new Promise((resolve) => {
        MongoClient.connect(uri, async (err, client) => {
          if (err) {
            console.log(`MONGO CONNECTION ERROR: ${err}`);

            throw err;
          } else {
            const db = client.db(MONGODB_DB);

            const user = db.collection('users').deleteMany({ uid });
            const games = db.collection('games').deleteMany({ uid });

            await Promise.all([user, games]);

            client.close();

            resolve({});
          }
        });
      });
    },
  });

  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  };
};
