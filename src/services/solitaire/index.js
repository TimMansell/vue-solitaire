import {
  checkValidCardMove,
  checkHasMoves,
  moveBoardCards,
  checkValidFoundationMove,
  moveFoundationCards,
} from './moves';
import { updateFoundation, getEmptyFoundationColumn } from './foundation';
import { updateBoard } from './board';
import {
  initGameState,
  getSavedGameState,
  setSaveGameState,
  removeSavedGameState,
  checkSavedGameState,
} from './gameState';
import setState from './state';

const solitaire = () => {
  let state = setState({});

  const setGameState = (newState) => {
    state = setState(state, newState);
  };

  const init = (board) => {
    const cards = initGameState(board);

    setGameState(cards);
  };

  const isGameSaved = () => checkSavedGameState();

  const saveGame = (gameState) => setSaveGameState(gameState);

  const loadGame = () => getSavedGameState();

  const removeSavedGame = () => removeSavedGameState();

  const setSelectedCard = (selectedCardId) => setGameState({ selectedCardId });

  const removeSelectedCard = () => setGameState({ selectedCardId: null });

  const moveCards = (selectedColumn) => {
    const cards = moveBoardCards(state, selectedColumn);
    const boardCards = updateBoard(state, cards);

    setGameState({ boardCards });
  };

  const isValidCardMove = (selectedColumn) => checkValidCardMove(state, selectedColumn);

  const findEmptyFoundationColumn = () => getEmptyFoundationColumn(state);

  const moveCardsToFoundation = (selectedColumn) => {
    const cards = moveFoundationCards(state, selectedColumn);
    const boardCards = updateBoard(state, cards);
    const foundationCards = updateFoundation(state, cards);

    setGameState({
      foundationCards,
      boardCards,
    });
  };

  const isValidFoundationMove = (selectedColumn) => checkValidFoundationMove(state, selectedColumn);

  const isEmptyBoard = () => !state.boardCards.flat().length;

  const hasMoves = () => checkHasMoves(state);

  const getBoardCards = () => state.boardCards;

  const getFoundationCards = () => state.foundationCards;

  return {
    init,
    saveGame,
    loadGame,
    isGameSaved,
    removeSavedGame,
    isEmptyBoard,
    getFoundationCards,
    getBoardCards,
    setSelectedCard,
    removeSelectedCard,
    hasMoves,
    isValidCardMove,
    isValidFoundationMove,
    moveCards,
    moveCardsToFoundation,
    findEmptyFoundationColumn,
  };
};

export default solitaire();
