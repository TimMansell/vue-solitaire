// import validation from './validation';
import { shuffleCards } from './helpers';
import { checkValidCardMove, checkHasMoves } from './moves';
import { getCardsFom, getCardsTo } from './cards';
import { getEmptyFoundationColumn, checkValidFoundationMove } from './foundation';
import getBoard from './board';
import settings from './settings.json';

const solitaire = () => {
  let foundationCards = [];
  let deck = [];
  let boardCards = [];
  let selectedCardId = null;

  const setFoundations = ({ rules }) => rules.foundationColumns.map(() => []);

  const setDeck = (cards) => shuffleCards(cards);

  const setBoard = ({ rules }) => getBoard(rules, deck);

  const init = () => {
    foundationCards = setFoundations(settings);
    deck = setDeck(settings.cards);
    boardCards = setBoard(settings);
  };

  const setSelectedCard = (id) => {
    selectedCardId = id;
  };

  const removeSelectedCard = () => {
    selectedCardId = null;
  };

  const setMoveCards = (selectedColumn) => {
    const cardFromColumn = getCardsFom(selectedCardId, boardCards);
    const cardsToColumn = getCardsTo(selectedCardId, selectedColumn, boardCards, boardCards);

    boardCards[cardFromColumn.column] = cardFromColumn.cards;
    boardCards[cardsToColumn.column] = cardsToColumn.cards;
  };

  const isValidCardMove = (selectedColumn) =>
    checkValidCardMove(boardCards, selectedCardId, selectedColumn);

  const findEmptyFoundationColumn = () =>
    getEmptyFoundationColumn(foundationCards, boardCards, selectedCardId);

  const moveCardsToFoundation = (selectedColumn) => {
    const cardFromColumn = getCardsFom(selectedCardId, boardCards);
    const cardsToColumn = getCardsTo(selectedCardId, selectedColumn, boardCards, foundationCards);

    boardCards[cardFromColumn.column] = cardFromColumn.cards;
    foundationCards[cardsToColumn.column] = cardsToColumn.cards;
  };

  const isValidFoundationMove = (selectedColumn) =>
    checkValidFoundationMove(selectedColumn, boardCards, selectedCardId, foundationCards);

  const isEmptyBoard = () => !boardCards.flat().length;

  const hasNoMoves = () => checkHasMoves(boardCards, foundationCards);

  const getBoardCards = () => boardCards;

  const getFoundationCards = () => foundationCards;

  const setTestBoard = ({ board, foundation }) => {
    if (board) {
      boardCards = [...board];
    }

    if (foundation) {
      foundationCards = [...foundation];
    }
  };

  return {
    init,
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
    setTestBoard,
  };
};

export default solitaire();
