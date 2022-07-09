const getters = {
  isGamePaused: ({ isGamePaused }) => isGamePaused,
  hasGameUpdated: ({ hasGameUpdated }) => hasGameUpdated,
  isOldVersion: ({ isOldVersion }) => isOldVersion,
  version: ({ version }) => version,
  isDisabledGame: (_, { isEmptyBoard, isGamePaused, hasConnectionError }) =>
    isEmptyBoard || isGamePaused || hasConnectionError,
};

export default getters;
