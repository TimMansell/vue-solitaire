export const setupValidation = (card, cardCompare) => (rule) =>
  rule(card, cardCompare);

// Card validation.
export const isMoveValidCard = (selectedCard, compareToCard) =>
  `${selectedCard.order}${selectedCard.suit}` !==
  `${compareToCard.order}${compareToCard.suit}`;

export const isMoveValidSuit = (selectedCard, compareToCard) =>
  selectedCard.suit === compareToCard.suit;

export const isMoveValidOrder = (selectedCard, compareToCard) =>
  selectedCard.order === compareToCard.order - 1;

export const isMoveValidColumn = (selectedCard, columnCards) =>
  !columnCards.find((card) => card.id === selectedCard.id);

export const isMoveValidKing = (selectedCard, compareToCard) =>
  selectedCard.value === 'K' && !compareToCard.value;

// Foundation validation.
export const isFoundationMoveValidPosition = (selectedCard, cards) =>
  cards.some((columnCards) => {
    const cardPosition = columnCards.findIndex(
      ({ id }) => id === selectedCard?.id
    );
    const emptyColumn = cardPosition !== -1;

    return cardPosition === columnCards.length - 1 && emptyColumn;
  });

export const isFoundationMoveValidAce = (selectedCard, compareToCard) =>
  selectedCard?.value === 'A' && !compareToCard.length;

export const isFoundationMoveValidSuit = (
  selectedCard,
  selectedFoundationCards
) => selectedFoundationCards.some((card) => card.suit === selectedCard?.suit);

export const isFoundationMoveValidOrder = (
  selectedCard,
  selectedFoundationCards
) => {
  return selectedCard?.order === selectedFoundationCards.length + 1;
};
