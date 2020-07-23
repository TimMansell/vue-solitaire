import { getSelectedCard, checkCardValue } from '../cards';
import {
  initFoundations,
  checkEmptyFoundationColumn,
  checkFoundationColumnSuit,
  getFoundationColumn,
} from './foundation';
import settings from '../settings.json';

export const initFoundation = () => initFoundations(settings);

export const updateFoundation = ({ foundationCards }, { foundationCardsTo }) =>
  foundationCards.map((columnCards, index) => {
    if (index === foundationCardsTo.columnNo) {
      return foundationCardsTo.cards;
    }

    return columnCards;
  });

export const getEmptyFoundationColumn = ({ foundationCards, boardCards, selectedCardId }) => {
  const selectedCard = getSelectedCard(boardCards, selectedCardId);

  const foundationColumnNo = foundationCards.findIndex((foundationColumn) => {
    const isColumnEmpty = checkEmptyFoundationColumn(foundationColumn);
    const isCorrectFoundationSuit = checkFoundationColumnSuit(foundationColumn, selectedCard);
    const isCardAce = checkCardValue(selectedCard, 'A');

    return (isColumnEmpty && isCardAce) || isCorrectFoundationSuit;
  });

  const foundationColumnToUse = getFoundationColumn(foundationColumnNo);

  return foundationColumnToUse;
};
