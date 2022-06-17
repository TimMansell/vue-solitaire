require('dotenv').config();

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

const WebSocket = require('ws');

const newMsg = ({ socket, msgName, msgPayload }) =>
  new Promise((resolve, reject) => {
    const messageFunction = (responseMsg) => {
      try {
        const { name, payload } = JSON.parse(Buffer.from(responseMsg));

        if (name === msgName) {
          socket.removeListener('message', messageFunction);

          resolve(payload);
        }
      } catch (error) {
        reject(error);
      }
    };

    socket.on('message', messageFunction);
    socket.send(msgPayload);
  });

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);

  let socket;

  on('before:run', async () => {
    socket = new WebSocket(process.env.VITE_WEBSOCKETS_URL);
  });

  on('task', {
    sendMsg({ name, payload, responseName }) {
      const msgPayload = JSON.stringify({ name, payload });
      const msgName = responseName || name;
      const msg = newMsg({ socket, msgName, msgPayload });

      return msg;
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
