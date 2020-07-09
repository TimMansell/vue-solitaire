export const setupValidation = (card, cardCompare) => (rule) => rule(card, cardCompare);

// Card validation.
export const isMoveValidCard = (selectedCard, compareToCard) =>
  `${selectedCard.order}${selectedCard.suit}` !== `${compareToCard.order}${compareToCard.suit}`;

export const isMoveValidSuit = (selectedCard, compareToCard) =>
  selectedCard.suit === compareToCard.suit;

export const isMoveValidOrder = (selectedCard, compareToCard) =>
  selectedCard.order === compareToCard.order - 1;

export const isMoveValidColumn = (selectedCard, columnCards) =>
  !columnCards.filter((card) => card.id === selectedCard.id).length;

export const isMoveValidKing = (selectedCard) => selectedCard.value === 'K';

// Foundation validation.
export const isFoundationMoveValidPosition = (selectedCard, boardCards) =>
  boardCards.some((cards) => {
    const cardPosition = cards.findIndex((card) => card.id === selectedCard.id);

    return cardPosition === cards.length - 1;
  });

export const isFoundationMoveValidAce = (selectedCard) => selectedCard.value === 'A';

export const isFoundationMoveValidSuit = ({ suit }, selectedFoundationCards) =>
  selectedFoundationCards.filter((card) => card.suit === suit).length > 0;

export const isFoundationMoveValidOrder = (selectedCard, selectedFoundationCards) =>
  selectedCard.order === selectedFoundationCards.length + 1;
