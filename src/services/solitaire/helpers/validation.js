export const validate = (card, cardCompare) => (rule) => rule(card, cardCompare);

export const isMoveValidCard = (selectedCard, compareToCard) =>
  `${selectedCard.order}${selectedCard.suit}` !== `${compareToCard.order}${compareToCard.suit}`;

export const isMoveValidSuit = (selectedCard, compareToCard) =>
  selectedCard.suit === compareToCard.suit;

export const isMoveValidOrder = (selectedCard, compareToCard) =>
  selectedCard.order === compareToCard.order - 1;

export const isMoveValidColumn = (selectedCard, columnCards) =>
  !columnCards.filter((card) => card.id === selectedCard.id).length;

export const isMoveValidPosition = (selectedCard, boardCards) =>
  boardCards.some((cards) => {
    const cardPosition = cards.findIndex((card) => card.id === selectedCard.id);

    return cardPosition === cards.length - 1;
  });

export const isValidKingMove = (selectedCard) => selectedCard.value === 'K';

export const isValidAceMove = (selectedCard) => selectedCard.value === 'A';

export const isMoveValidFoundationSuit = ({ suit }, selectedFoundationCards) =>
  selectedFoundationCards.filter((card) => card.suit === suit).length > 0;

export const isMoveValidFoundationOrder = (selectedCard, selectedFoundationCards) =>
  selectedCard.order === selectedFoundationCards.length + 1;
