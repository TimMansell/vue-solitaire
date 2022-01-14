const { MongoClient } = require('mongodb');
require('dotenv').config();

const { MONGOBD_URI, MONGODB_USER, MONGOBD_PASS, MONGODB_DB } = process.env;
const URI = `mongodb+srv://${MONGODB_USER}:${MONGOBD_PASS}@${MONGOBD_URI}/test?retryWrites=true&w=majority`;

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  let connection;
  let db;

  on('before:run', async () => {
    connection = await MongoClient.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = connection.db(MONGODB_DB);
  });

  on('after:run', () => {
    connection.close();
  });

  on('task', {
    populateDeck(cards) {
      return db
        .collection('decks')
        .findOneAndUpdate(
          { isMocked: true },
          { $set: { uid: null, cards, isMocked: true } },
          { upsert: true }
        );
    },
    getGlobalCounts() {
      return db.collection('globalStats').findOne({});
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
