const getters = {
  hasConnectionError: ({ isOnline, isConnecting }) =>
    !isOnline && !isConnecting,
};

export default getters;
