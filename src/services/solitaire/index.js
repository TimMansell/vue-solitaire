import { checkValidCardMove, checkHasMoves } from './moves';
import { initCards, moveCardsFrom, moveCardsTo } from './cards';
import {
  initFoundations,
  updateFoundation,
  getEmptyFoundationColumn,
  checkValidFoundationMove,
  moveFoundationCardsTo,
} from './foundation';
import { initBoard, updateBoard } from './board';
import settings from './settings.json';

const solitaire = () => {
  let state = {
    foundationCards: [],
    deck: [],
    boardCards: [],
    selectedCardId: null,
  };

  const init = () => {
    const foundationCards = initFoundations(settings);
    const deck = initCards(settings);
    const boardCards = initBoard(settings, deck);

    state = {
      ...state,
      foundationCards,
      deck,
      boardCards,
    };
  };

  const setBoard = ({ board }) => {
    const boardCards = [...board];

    state = {
      ...state,
      boardCards,
    };
  };

  const setFoundation = ({ foundation }) => {
    const foundationCards = [...foundation];

    state = {
      ...state,
      foundationCards,
    };
  };

  const setSelectedCard = (selectedCardId) => {
    state = {
      ...state,
      selectedCardId,
    };
  };

  const removeSelectedCard = () => {
    const selectedCardId = null;

    state = {
      ...state,
      selectedCardId,
    };
  };

  const setMoveCards = (selectedColumn) => {
    const cardFromColumn = moveCardsFrom(state);
    const cardsToColumn = moveCardsTo(state, selectedColumn);
    const boardCards = updateBoard(state, cardFromColumn, cardsToColumn);

    state = {
      ...state,
      boardCards,
    };
  };

  const isValidCardMove = (selectedColumn) => checkValidCardMove(state, selectedColumn);

  const findEmptyFoundationColumn = () => getEmptyFoundationColumn(state);

  const moveCardsToFoundation = (selectedColumn) => {
    const cardFromColumn = moveCardsFrom(state);
    const cardsToColumn = moveFoundationCardsTo(state, selectedColumn);
    const boardCards = updateBoard(state, cardFromColumn);
    const foundationCards = updateFoundation(state, cardsToColumn);

    state = {
      ...state,
      boardCards,
      foundationCards,
    };
  };

  const isValidFoundationMove = (selectedColumn) => checkValidFoundationMove(state, selectedColumn);

  const isEmptyBoard = () => !state.boardCards.flat().length;

  const hasNoMoves = () => checkHasMoves(state);

  const getBoardCards = () => state.boardCards;

  const getFoundationCards = () => state.foundationCards;

  return {
    init,
    setBoard,
    setFoundation,
    isEmptyBoard,
    getFoundationCards,
    getBoardCards,
    setSelectedCard,
    removeSelectedCard,
    hasNoMoves,
    isValidCardMove,
    isValidFoundationMove,
    setMoveCards,
    moveCardsToFoundation,
    findEmptyFoundationColumn,
  };
};

export default solitaire();
