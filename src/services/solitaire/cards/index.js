import shuffle from 'lodash.shuffle';
import {
  setVisibleCards,
  getColumnCardIndexes,
  getColumnCards,
  findCardColumn,
  findCardPosition,
} from './cards';

export const buildCards = ({ values, suits }) =>
  values.flatMap((value, order) =>
    suits.map((suit) => ({
      id: `${order}${suit}`,
      value,
      order,
      suit,
      visible: false,
    }))
  );

export const dealCards = (deck, { columns }) => {
  const columnCardsIndexes = getColumnCardIndexes(columns);
  const columnCards = getColumnCards(deck, columnCardsIndexes);
  const dealtCards = setVisibleCards(columnCards);

  return dealtCards;
};

export const shuffleCards = (cards, toShuffle) => (toShuffle ? shuffle(cards) : cards);

export const getSelectedCard = (cards, selectedCardId) => {
  const [selectedCard] = cards.flat().filter((card) => card.id === selectedCardId);

  return selectedCard;
};

export const getCardPosition = (boardCards, selectedCardId) => {
  const columnNo = findCardColumn(boardCards, selectedCardId);
  const cardPosition = findCardPosition(boardCards[columnNo], selectedCardId);

  return {
    columnNo,
    cardPosition,
  };
};

export const getVisibleCards = (cards) => cards.flat().filter((card) => card.visible);

export const getLastCard = (board, selectedColumn) => {
  const [lastCard] = board[selectedColumn].slice(-1);

  if (!lastCard) {
    return {};
  }

  return lastCard;
};

export const getLastCards = (cards) => cards.map((card) => card.slice(-1)).flat();

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
