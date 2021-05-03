const getters = {
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  isGamePaused: (state) => state.isGamePaused.isPaused,
  isGameActive: (state) => state.isGamePaused.isActive,
  isTimerPaused: (state) => state.isTimerPaused,
  timer: (state) => state.game.time,
  showRules: (state) => state.showRules,
  showNewGame: (state) => state.showNewGame,
  version: (state) => state.version,
  versionMatch: (state) => state.versionMatch,
};

export default getters;
