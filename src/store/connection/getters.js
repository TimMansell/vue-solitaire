const getters = {
  isConnecting: ({ isConnecting }) => isConnecting,
  hasConnectionError: ({ isConnecting, isOnline }) =>
    !isOnline && !isConnecting,
  hasConnected: ({ hasConnected, isOnline }) => hasConnected && isOnline,
};

export default getters;
