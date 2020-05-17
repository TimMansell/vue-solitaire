import { checkValidCardMove, checkHasMoves } from './moves';
import { initCards, moveCardsFrom, moveCardsTo } from './cards';
import { initFoundations, getEmptyFoundationColumn, checkValidFoundationMove } from './foundation';
import initBoard from './board';
import settings from './settings.json';

const solitaire = () => {
  let foundationCards = [];
  let deck = [];
  let boardCards = [];
  let selectedCardId = null;

  const init = () => {
    foundationCards = initFoundations(settings);
    deck = initCards(settings);
    boardCards = initBoard(settings, deck);
  };

  const setBoard = ({ board }) => {
    boardCards = [...board];
  };

  const setFoundation = ({ foundation }) => {
    foundationCards = [...foundation];
  };

  const setSelectedCard = (id) => {
    selectedCardId = id;
  };

  const removeSelectedCard = () => {
    selectedCardId = null;
  };

  const setMoveCards = (selectedColumn) => {
    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards);
    const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, boardCards, boardCards);

    boardCards[cardFromColumn.column] = cardFromColumn.cards;
    boardCards[cardsToColumn.column] = cardsToColumn.cards;
  };

  const isValidCardMove = (selectedColumn) =>
    checkValidCardMove(boardCards, selectedCardId, selectedColumn);

  const findEmptyFoundationColumn = () =>
    getEmptyFoundationColumn(foundationCards, boardCards, selectedCardId);

  const moveCardsToFoundation = (selectedColumn) => {
    const cardFromColumn = moveCardsFrom(selectedCardId, boardCards);
    const cardsToColumn = moveCardsTo(selectedCardId, selectedColumn, boardCards, foundationCards);

    boardCards[cardFromColumn.column] = cardFromColumn.cards;
    foundationCards[cardsToColumn.column] = cardsToColumn.cards;
  };

  const isValidFoundationMove = (selectedColumn) =>
    checkValidFoundationMove(selectedColumn, boardCards, selectedCardId, foundationCards);

  const isEmptyBoard = () => !boardCards.flat().length;

  const hasNoMoves = () => checkHasMoves(boardCards, foundationCards);

  const getBoardCards = () => boardCards;

  const getFoundationCards = () => foundationCards;

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
