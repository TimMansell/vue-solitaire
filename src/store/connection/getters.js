const getters = {
  isConnecting: ({ isConnecting }) => isConnecting,
  hasConnectionError: ({ isConnecting, isOnline }) =>
    !isOnline && !isConnecting,
};

export default getters;
