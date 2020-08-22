import {
  checkValidCardMove,
  checkHasMoves,
  moveBoardCards,
  checkValidFoundationMove,
  moveFoundationCards,
} from './moves';
import { initFoundation, updateFoundation, getEmptyFoundationColumn } from './foundation';
import { initBoard, updateBoard } from './board';
import setState from './state';

const saveGame = (gameState) => localStorage.setItem('game', JSON.stringify(gameState));

const removeSavedGame = () => localStorage.removeItem('game');

const getSavedGame = () => JSON.parse(localStorage.getItem('game'));

const checkSavedGame = () => getSavedGame() !== null;

const loadGame = () => {
  const { board } = getSavedGame();

  return {
    foundationCards: board.foundation,
    boardCards: board.columns,
  };
};

const initGame = () => {
  return {
    foundationCards: initFoundation(),
    boardCards: initBoard(),
  };
};

const solitaire = () => {
  let state = setState({});

  const setGameState = (newState) => {
    state = setState(state, newState);
  };

  const checkGameState = () => checkSavedGame();

  const saveGameState = (gameState) => saveGame(gameState);

  const loadGameState = () => getSavedGame();

  const removeGameState = () => removeSavedGame();

  const setBoard = ({ columns }) => columns;

  const setFoundation = ({ foundation }) => foundation;

  const init = () => {
    const isGameSaved = checkSavedGame();
    const cards = isGameSaved ? loadGame() : initGame();

    setGameState(cards);
  };

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
    checkGameState,
    saveGameState,
    loadGameState,
    removeGameState,
    setBoard,
    setFoundation,
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
