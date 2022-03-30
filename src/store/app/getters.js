const getters = {
  isGamePaused: ({ isGamePaused }) => isGamePaused,
  isOverlayVisible: ({ isOverlayVisible }) => isOverlayVisible,
  hasGameUpdated: ({ hasGameUpdated }) => hasGameUpdated,
  isOldVersion: ({ isOldVersion }) => isOldVersion,
  version: ({ version }) => version,
  isDisabledGame: (_, { isEmptyBoard, isGamePaused, hasConnectionError }) =>
    isEmptyBoard || isGamePaused || hasConnectionError,
};

export default getters;
