import {
  checkValidCardMove,
  checkHasMoves,
  moveBoardCards,
  checkValidFoundationMove,
  moveFoundationCards,
} from './moves';
import {
  initFoundation,
  loadFoundation,
  updateFoundation,
  getEmptyFoundationColumn,
} from './foundation';
import { initBoard, loadBoard, updateBoard } from './board';
import setState from './state';

const solitaire = () => {
  let state = setState({});

  const setGameState = (newState) => {
    state = setState(state, newState);
  };

  const init = (board) => {
    const cards = {
      foundationCards: board ? loadFoundation(board) : initFoundation(),
      boardCards: board ? loadBoard(board) : initBoard(),
    };

    setGameState(cards);
  };

  const setSelectedCard = (selectedCardId) => setGameState({ selectedCardId });

  const removeSelectedCard = () => setGameState({ selectedCardId: null });

  const moveCards = (selectedColumn) => {
    const cards = moveBoardCards(state, selectedColumn);
    const boardCards = updateBoard(state, cards);

    setGameState({ boardCards });
  };

  const isValidCardMove = (selectedColumn) =>
    checkValidCardMove(state, selectedColumn);

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

  const isValidFoundationMove = (selectedColumn) =>
    checkValidFoundationMove(state, selectedColumn);

  const isEmptyBoard = () => !state.boardCards.flat().length;

  const hasMoves = () => checkHasMoves(state);

  const getBoardCards = () => state.boardCards;

  const getFoundationCards = () => state.foundationCards;

  return {
    init,
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
