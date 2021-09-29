const getters = {
  isGameLoading: (state) => state.isGameLoading,
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  timer: (state) => state.game.time,
  moves: (state) => state.game.moves.length,
  versionMatch: (state) => state.versionMatch,
};

export default getters;
