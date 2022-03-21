import { io } from 'socket.io-client';

const on = (socket, name, callback) => socket.on(name, (obj) => callback(obj));

const emit = (socket, name, payload) => socket.emit(name, payload);

const onConnect = (socket, callback) => on(socket, 'connect', callback);

const onDisconnect = (socket, callback) => {
  on(socket, 'disconnect', callback);
  on(socket, 'connect_error', callback);
};

// eslint-disable-next-line import/prefer-default-export
export const connect = (params) => {
  const { VITE_WEBSOCKETS_URL } = import.meta.env;

  const socket = io(VITE_WEBSOCKETS_URL, {
    transports: ['websocket'],
    query: {
      ...params,
    },
  });

  return {
    on: (name, callback) => on(socket, name, callback),
    emit: (name, payload) => emit(socket, name, payload),
    onConnect: (callback) => onConnect(socket, callback),
    onDisconnect: (callback) => onDisconnect(socket, callback),
  };
};
