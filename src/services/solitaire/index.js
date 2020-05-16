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

  const initFoundations = ({ rules }) => rules.foundationColumns.map(() => []);

  const initDeck = (cards) => shuffleCards(cards);

  const initBoard = ({ rules }) => getBoard(rules, deck);

  const init = () => {
    foundationCards = initFoundations(settings);
    deck = initDeck(settings.cards);
    boardCards = initBoard(settings);
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
