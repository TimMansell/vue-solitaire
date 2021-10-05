import { io } from 'socket.io-client';

const { VITE_WEBSOCKETS_URL } = import.meta.env;

// eslint-disable-next-line import/prefer-default-export
export const socket = io(VITE_WEBSOCKETS_URL, {
  transports: ['websocket'],
});

export const socketConnect = (callback) => {
  socket.on('connect', (obj) => {
    callback(obj);
  });
};

export const socketEmit = (name, payload) => socket.emit(name, payload);

export const socketOn = (name, callback) => {
  socket.on(name, (obj) => {
    callback(obj);
  });
};
