import {
  buildCards,
  shuffleCards,
  findCardColumn,
  findCardPosition,
} from './cards';
import { checkInitialBoardMoves } from '../moves';

export const initCards = () => {
  const deck = buildCards();
  const shuffledDeck = shuffleCards(deck);
  const hasBoardMoves = checkInitialBoardMoves(shuffledDeck);

  if (!hasBoardMoves) {
    return initCards();
  }

  return shuffledDeck;
};

export const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards
    .flat()
    .filter((card) => card.id === selectedCardId);

  return selectedCard;
};

export const getColumnCardsContaining = (cards, selectedCardId) => {
  const column = cards.find((columnCards) =>
    columnCards.find(({ id }) => id === selectedCardId)
  );

  return column;
};

export const getCardsFromColumn = (cards, columnNo) => {
  const columnCards = cards.find((column, index) => index === columnNo);

  return columnCards;
};

export const getCardPosition = (cards, selectedCardId) => {
  const columnCards = getColumnCardsContaining(cards, selectedCardId);
  const columnNo = findCardColumn(cards, selectedCardId);
  const cardPosition = findCardPosition(columnCards, selectedCardId);

  return {
    columnNo,
    cardPosition,
  };
};

export const getVisibleCards = (cards) =>
  cards.flat().filter((card) => card.visible);

export const getLastCard = (board, selectedColumn) => {
  const columnCards = getCardsFromColumn(board, selectedColumn);
  const [lastCard] = columnCards.slice(-1);

  if (!lastCard) {
    return {};
  }

  return lastCard;
};

export const getLastCards = (cards) =>
  cards.map((card) => card.slice(-1)).flat();

export const showLastCard = (cards) =>
  cards.map((card, index) => {
    if (index === cards.length - 1) {
      return {
        ...card,
        visible: true,
      };
    }

    return card;
  });

export const checkCardValue = (card, value) => card.value === value;

export const checkCardTopPosition = (cards, selectedCardId) => {
  const { cardPosition } = getCardPosition(cards, selectedCardId);

  return cardPosition === 0;
};

export const getColumnCardsToMove = ({
  toCards,
  fromCards,
  selectedColumn,
  columnNo,
  cardPosition,
}) => {
  const columnCardsTo = getCardsFromColumn(toCards, selectedColumn);
  const columnCardsFrom = getCardsFromColumn(fromCards, columnNo);
  const moveCards = columnCardsFrom.slice(cardPosition);

  return [...columnCardsTo, ...moveCards];
};
