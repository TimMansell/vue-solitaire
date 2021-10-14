const getters = {
  game: (state) => state.game,
  isGameLoading: (state) => state.isGameLoading,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  gameOutcome: (state) => state.gameOutcome,
  timer: (state) => state.game.time,
  moves: (state) => state.game.moves.length,
  versionMatch: (state) => state.versionMatch,
  isConnecting: (state) => state.connection.isConnecting,
  isOnline: (state) => state.connection.isOnline,
};

export default getters;
