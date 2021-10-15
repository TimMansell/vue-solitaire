const getters = {
  game: (state) => state.game,
  isGameLoading: (state) => state.isGameLoading,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  gameOutcome: (state) => state.gameOutcome,
  timer: (state) => state.game.times.length,
  moves: (state) => state.game.moves.length,
  gameHash: (state) => state.game.hash,
  versionMatch: (state) => state.versionMatch,
  isConnecting: (state) => state.connection.isConnecting,
  isOnline: (state) => state.connection.isOnline,
  latestTime: (state) => state.game.times.slice(-1)[0],
};

export default getters;
