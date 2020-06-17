import { checkValidCardMove, checkHasMoves } from './moves';
import { initCards, moveCardsFrom, moveCardsTo } from './cards';
import {
  initFoundations,
  updateFoundation,
  getEmptyFoundationColumn,
  checkValidFoundationMove,
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

  const setSelectedCard = (id) => {
    const selectedCardId = id;

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
    const cardFromColumn = moveCardsFrom(state.selectedCardId, state.boardCards);
    const cardsToColumn = moveCardsTo(
      state.selectedCardId,
      selectedColumn,
      state.boardCards,
      state.boardCards
    );
    const boardCards = updateBoard(state.boardCards, cardFromColumn, cardsToColumn);

    state = {
      ...state,
      boardCards,
    };
  };

  const isValidCardMove = (selectedColumn) =>
    checkValidCardMove(state.boardCards, state.selectedCardId, selectedColumn);

  const findEmptyFoundationColumn = () =>
    getEmptyFoundationColumn(state.foundationCards, state.boardCards, state.selectedCardId);

  const moveCardsToFoundation = (selectedColumn) => {
    const cardFromColumn = moveCardsFrom(state.selectedCardId, state.boardCards);
    const cardsToColumn = moveCardsTo(
      state.selectedCardId,
      selectedColumn,
      state.boardCards,
      state.foundationCards
    );
    const boardCards = updateBoard(state.boardCards, cardFromColumn);
    const foundationCards = updateFoundation(state.foundationCards, cardsToColumn);

    state = {
      ...state,
      boardCards,
      foundationCards,
    };
  };

  const isValidFoundationMove = (selectedColumn) =>
    checkValidFoundationMove(
      selectedColumn,
      state.boardCards,
      state.selectedCardId,
      state.foundationCards
    );

  const isEmptyBoard = () => !state.boardCards.flat().length;

  const hasNoMoves = () => checkHasMoves(state.boardCards, state.foundationCards);

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
