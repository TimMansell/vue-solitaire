export const isMoveValidCard = (selectedCard, lastColumnCard) =>
  `${selectedCard.order}${selectedCard.suit}` !== `${lastColumnCard.order}${lastColumnCard.suit}`;

export const isMoveValidSuit = (selectedCard, lastColumnCard) =>
  selectedCard.suit === lastColumnCard.suit;

export const isMoveValidOrder = (selectedCard, lastColumnCard) =>
  selectedCard.order === lastColumnCard.order - 1;

export const isMoveValidColumn = (selectedCard, columnCards) =>
  columnCards.filter((card) => card.id === selectedCard.id).length > 0;

export const isMoveValidPosition = (selectedCard, boardCards) => {
  const isCardValidPosition = boardCards.some((cards) => {
    const cardPosition = cards.findIndex((card) => card.id === selectedCard.id);

    if (cardPosition === cards.length - 1) {
      return true;
    }

    return false;
  });

  return isCardValidPosition;
};

export const isValidKingMove = (selectedCard, lastColumnCard) =>
  selectedCard.order === 13 && !lastColumnCard;

export const isMoveValidFoundationSuit = (selectedCard, selectedFoundationCards) => {
  const { suit } = selectedCard;

  const foundationSuit = selectedFoundationCards.filter((ace) => ace.suit === suit);

  if (!foundationSuit.length && selectedFoundationCards.length) {
    return false;
  }

  return true;
};

export const isMoveValidFoundationOrder = (selectedCard, selectedFoundationCards) =>
  selectedCard.order === selectedFoundationCards.length + 1;
