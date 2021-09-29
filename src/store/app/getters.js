const getters = {
  isGameLoading: (state) => state.isGameLoading,
  hasGameWon: (state) => state.hasGameWon,
  hasGameLost: (state) => state.hasGameLost,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  timer: (state) => state.game.time,
  moves: (state) => state.game.moves.length,
  versionMatch: (state) => state.versionMatch,
};

export default getters;
