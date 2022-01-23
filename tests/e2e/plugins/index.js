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
    async getUserStats(uid) {
      const { games } = await db.collection('users').findOne({ uid }, {});

      return games;
    },
    async getGlobalStats() {
      const [counts] = await db
        .collection('games')
        .aggregate([
          {
            $facet: {
              completed: [
                { $match: { completed: true } },
                { $count: 'completed' },
              ],
              won: [{ $match: { won: true } }, { $count: 'won' }],
              lost: [{ $match: { lost: true } }, { $count: 'lost' }],
              quit: [
                { $match: { won: false, lost: false, completed: true } },
                { $count: 'quit' },
              ],
            },
          },
          {
            $project: {
              completed: { $arrayElemAt: ['$completed.completed', 0] },
              won: { $arrayElemAt: ['$won.won', 0] },
              lost: { $arrayElemAt: ['$lost.lost', 0] },
              quit: { $arrayElemAt: ['$quit.quit', 0] },
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
