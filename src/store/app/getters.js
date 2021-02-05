const getters = {
  // boardCards: (state) => state.board.cards,
  // foundationCards: (state) => state.board.foundation,
  // selectedCardId: (state) => state.selectedCardId,
  // hasMoves: (state) => state.hasMoves,
  isGameWon: (state) => state.isGameWon,
  isGameLost: (state) => state.isGameLost,
  isGamePaused: (state) => state.isGamePaused.isPaused,
  isGameActive: (state) => state.isGamePaused.isActive,
  isTimerPaused: (state) => state.isTimerPaused,
  timer: (state) => state.game.time,
  showRules: (state) => state.showRules,
  showNewGame: (state) => state.showNewGame,
  // draggedCards: (state) => state.draggedCards,
};

export default getters;
