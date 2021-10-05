const getters = {
  isGameLoading: (state) => state.isGameLoading,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  gameOutcome: (state) => state.gameOutcome,
  timer: (state) => state.game.time,
  moves: (state) => state.game.moves.length,
  versionMatch: (state) => state.versionMatch,
  hasConnection: (state) => state.hasConnection,
};

export default getters;
