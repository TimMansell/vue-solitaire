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
    mockServerDeck({ cards, uid }) {
      return db
        .collection('decks')
        .findOneAndUpdate({ uid }, { $set: { uid, cards } }, { upsert: true });
    },
    getPlayerCount() {
      return db.collection('users').find({}, {}).count();
    },
    async getStats(filter) {
      const [counts] = await db
        .collection('games')
        .aggregate([
          {
            $facet: {
              completed: [
                { $match: { ...filter, completed: true } },
                { $count: 'count' },
              ],
              won: [{ $match: { ...filter, won: true } }, { $count: 'count' }],
              lost: [
                { $match: { ...filter, lost: true } },
                { $count: 'count' },
              ],
              quit: [
                {
                  $match: {
                    ...filter,
                    won: false,
                    lost: false,
                    completed: true,
                  },
                },
                { $count: 'count' },
              ],
            },
          },
          {
            $project: {
              completed: {
                $ifNull: [{ $first: '$completed.count' }, 0],
              },
              won: {
                $ifNull: [{ $first: '$won.count' }, 0],
              },
              lost: {
                $ifNull: [{ $first: '$lost.count' }, 0],
              },
              quit: {
                $ifNull: [{ $first: '$quit.count' }, 0],
              },
            },
          },
        ])
        .toArray();

      return counts;
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
