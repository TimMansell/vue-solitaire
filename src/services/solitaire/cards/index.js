import { shuffleCards, dealCards, findCardColumn, findCardPosition } from './cards';

export const initCards = ({ cards, rules }) => {
  const deck = shuffleCards(cards);
  const dealtCards = dealCards(rules, deck);

  return dealtCards;
};

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
