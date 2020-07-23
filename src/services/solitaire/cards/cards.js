import shuffle from 'lodash.shuffle';

const offsetCards = (cards) =>
  cards
    .reverse()
    .map((card, index) => {
      if (index % 2 === 0) {
        return {
          ...card,
          visible: true,
        };
      }

      return card;
    })
    .reverse();

export const shuffleCards = ({ values, suits }) =>
  shuffle(
    values.flatMap((value, order) =>
      suits.map((suit) => ({
        id: `${order}${suit}`,
        value,
        order,
        suit,
        visible: false,
      }))
    )
  );

export const dealCards = ({ columns }, deck) =>
  columns.map((column, columnIndex, array) => {
    const startArray = array.slice(0, columnIndex);
    const endArray = array.slice(0, columnIndex + 1);

    const calcOffset = (accumulator, currentValue) => accumulator + currentValue;

    const startIndex = startArray.reduce(calcOffset, 0);
    const endIndex = endArray.reduce(calcOffset, 0);

    const cards = deck.slice(startIndex, endIndex);
    const offsettedCards = offsetCards(cards);

    return offsettedCards;
  });

export const findCardPosition = (columnCards, selectedCardId) =>
  columnCards.findIndex((card) => card.id === selectedCardId);

export const findCardColumn = (boardCards, selectedCardId) =>
  boardCards.findIndex((cards) => cards.find((card) => card.id === selectedCardId));
