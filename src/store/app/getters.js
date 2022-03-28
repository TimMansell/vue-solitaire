const getters = {
  game: ({ game }) => game,
  isGameLoading: ({ isGameLoading }) => isGameLoading,
  isGamePaused: ({ isGamePaused }) => isGamePaused,
  isOverlayVisible: ({ isOverlayVisible }) => isOverlayVisible,
  gameOutcome: ({ gameOutcome }) => gameOutcome,
  timer: ({ game }) => game.time,
  moves: ({ game }) => game.moves.length,
  hasGameUpdated: ({ hasGameUpdated }) => hasGameUpdated,
  isOldVersion: ({ isOldVersion }) => isOldVersion,
  version: ({ version }) => version,
  isDisabledGame: (_, { isEmptyBoard, isGamePaused, hasConnectionError }) =>
    isEmptyBoard || isGamePaused || hasConnectionError,
};

export default getters;
