const getters = {
  isGameLoading: (state) => state.isGameLoading,
  isGamePaused: (state) => state.isGamePaused,
  isOverlayVisible: (state) => state.isOverlayVisible,
  gameOutcome: (state) => state.gameOutcome,
  timer: (state) => state.game.times.length,
  moves: (state) => state.game.moves.filter(({ isMove }) => isMove).length,
  versionMatch: (state) => state.versionMatch,
};

export default getters;
