import {
  buildCards,
  shuffleCards,
  dealCards,
  findCardColumn,
  findCardPosition,
} from './cards';

import { ranks, suits, columns } from '../settings.json';

export const initCards = () => {
  const deck = buildCards({ ranks, suits });
  const shuffledDeck = shuffleCards(deck);
  const cards = dealCards(shuffledDeck, columns);

  return cards;
};

export const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards
    .flat()
    .filter((card) => card.id === selectedCardId);

  return selectedCard;
};

export const getCardPosition = (cards, selectedCardId) => {
  const columnNo = findCardColumn(cards, selectedCardId);
  const cardPosition = findCardPosition(cards[columnNo], selectedCardId);

  return {
    columnNo,
    cardPosition,
  };
};

export const getVisibleCards = (cards) =>
  cards.flat().filter((card) => card.visible);

export const getLastCard = (board, selectedColumn) => {
  const [lastCard] = board[selectedColumn].slice(-1);

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

export const getColumnCards = ({
  toCards,
  fromCards,
  selectedColumn,
  columnNo,
  cardPosition,
}) => {
  const columnCards = toCards[selectedColumn];
  const moveCards = fromCards[columnNo].slice(cardPosition);

  return [...columnCards, ...moveCards];
};
