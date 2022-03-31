const getters = {
  isGamePaused: ({ isGamePaused }) => isGamePaused,
  isOverlayVisible: ({ isOverlayVisible }) => isOverlayVisible,
  hasGameUpdated: ({ hasGameUpdated }) => hasGameUpdated,
  isOldVersion: ({ isOldVersion }) => isOldVersion,
  version: ({ version }) => version,
  latestVersion: ({ latestVersion }) => latestVersion,
  isDisabledGame: (_, { isEmptyBoard, isGamePaused, hasConnectionError }) =>
    isEmptyBoard || isGamePaused || hasConnectionError,
};

export default getters;
