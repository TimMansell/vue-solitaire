import shuffle from 'lodash.shuffle';
import {
  setVisibleCards,
  getColumnCardIndexes,
  getColumnCardsFromDeck,
} from './helpers';

export const findCardPosition = (columnCards, selectedCardId) =>
  columnCards.findIndex(({ id }) => id === selectedCardId);

export const findCardColumn = (cards, selectedCardId) =>
  cards.findIndex((columnCards) =>
    columnCards.find(({ id }) => id === selectedCardId)
  );

export const buildCards = ({ ranks, suits }) =>
  ranks.flatMap((value, valueOrder) => {
    const order = valueOrder + 1;

    const cards = suits.map((suit, suitOrder) => ({
      id: order + ranks.length * suitOrder,
      value,
      order,
      suit,
      visible: false,
    }));

    return cards;
  });

export const dealCards = (deck, columns) => {
  const columnCardsIndexes = getColumnCardIndexes(columns);
  const columnCards = getColumnCardsFromDeck(deck, columnCardsIndexes);
  const dealtCards = setVisibleCards(columnCards);

  return dealtCards;
};

export const shuffleCards = (cards) => shuffle(cards);
