import { io } from 'socket.io-client';

let socket;

export const createConnection = (uid) => {
  const { VITE_WEBSOCKETS_URL } = import.meta.env;

  socket = io(VITE_WEBSOCKETS_URL, {
    transports: ['websocket'],
    query: {
      uid,
    },
  });
};

export const emit = (name, payload) => socket.emit(name, payload);

export const on = (name, callback) =>
  socket.on(name, (obj) => {
    callback(obj);
  });

export const connect = (callback) => on('connect', callback);

export const disconnect = (callback) => on('disconnect', callback);

export const error = (callback) => on('connect_error', callback);
