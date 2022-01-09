const getters = {
  game: ({ game }) => game,
  isGameLoading: ({ isGameLoading }) => isGameLoading,
  isGamePaused: ({ isGamePaused }) => isGamePaused,
  isOverlayVisible: ({ isOverlayVisible }) => isOverlayVisible,
  gameOutcome: ({ gameOutcome }) => gameOutcome,
  timer: ({ game }) => game.time,
  moves: ({ game }) => game.moves.length,
  isOutdated: ({ version }) => version.isOutdated,
  isLatest: ({ version }) => version.isLatest,
  isConnecting: ({ connection }) => connection.isConnecting,
  isOnline: ({ connection }) => connection.isOnline,
  isCompletedGame: ({ gameOutcome }) =>
    gameOutcome.hasGameLost || gameOutcome.hasGameWon,
};

export default getters;
