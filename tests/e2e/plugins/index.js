require('dotenv').config();

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

const WebSocket = require('ws');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  let socket;

  on('before:spec', async () => {
    socket = new WebSocket(process.env.VITE_WEBSOCKETS_URL);
  });

  on('task', {
    sendMsg(msgPayload) {
      const msgPromise = new Promise((resolve, reject) => {
        const messageFunction = (msg) => {
          try {
            const data = Buffer.from(msg);
            const { payload } = JSON.parse(data);

            resolve(payload);
          } catch (error) {
            reject(error);
          }

          socket.removeListener('message', messageFunction);
        };

        socket.on('message', messageFunction);
      });

      socket.send(msgPayload);

      return msgPromise;
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
