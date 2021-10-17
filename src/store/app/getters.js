const getters = {
  game: (state) => state.gamev300,
  isGameLoading: (state) => state.isGameLoading,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  gameOutcome: (state) => state.gameOutcome,
  timer: (state) => state.gamev300.times.length,
  moves: (state) => state.gamev300.moves.length,
  gameHash: (state) => state.gamev300.hash,
  versionMatch: (state) => state.versionMatch,
  isConnecting: (state) => state.connection.isConnecting,
  isOnline: (state) => state.connection.isOnline,
  prevHash: (state) => state.gamev300.times.slice(-1)[0]?.hash ?? '',
};

export default getters;
