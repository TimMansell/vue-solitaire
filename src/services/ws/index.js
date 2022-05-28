import queryString from 'query-string';
import EventEmitter from 'eventemitter3';

const emitter = new EventEmitter();

// eslint-disable-next-line import/prefer-default-export
export const connect = ({ uid, hasGameStarted, version }) => {
  const { OPEN, CONNECTING } = WebSocket;
  const { VITE_WEBSOCKETS_URL } = import.meta.env;
  const query = queryString.stringify({ uid, version });

  const socket = new WebSocket(`${VITE_WEBSOCKETS_URL}?${query}`, []);

  const on = (name, callback) =>
    emitter.on(name, (payload) => callback(payload));

  const send = (message) => {
    const { readyState } = socket;

    if (readyState === OPEN) {
      socket.send(message);
    } else if (readyState === CONNECTING) {
      socket.addEventListener('open', () => send(message), {
        once: true,
      });
    }
  };

  const emit = (name, payload) => send(JSON.stringify({ name, payload }));

  socket.addEventListener('open', () => {
    emitter.emit('connect');

    emit('user');
    emit('userPlayed');
    emit('playerCount');
    emit('globalPlayed');

    if (hasGameStarted) return;

    emit('initGame');
  });

  socket.addEventListener('close', () => emitter.emit('disconnect'));

  socket.addEventListener('message', ({ data }) => {
    try {
      const { name, payload } = JSON.parse(data);

      emitter.emit(name, payload);
    } catch (error) {
      console.log({ error });
    }
  });

  return {
    on,
    emit,
  };
};
