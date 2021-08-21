import { getSelectedCard, checkCardValue } from '../cards';
import {
  initFoundations,
  checkEmptyFoundationColumn,
  checkFoundationColumnSuit,
  getFoundationColumn,
} from './foundation';
import settings from '../settings.json';

export const initFoundation = () => initFoundations(settings);

export const updateFoundation = ({ foundation }, { foundationCardsTo }) =>
  foundation.map((columnCards, index) => {
    if (index === foundationCardsTo.columnNo) {
      return foundationCardsTo.columnCards;
    }

    return columnCards;
  });

export const getEmptyFoundationColumn = ({
  foundation,
  cards,
  selectedCardId,
}) => {
  const selectedCard = getSelectedCard(cards, selectedCardId);

  const foundationColumnNo = foundation.findIndex((foundationColumn) => {
    const isColumnEmpty = checkEmptyFoundationColumn(foundationColumn);
    const isCorrectFoundationSuit = checkFoundationColumnSuit(
      foundationColumn,
      selectedCard
    );
    const isCardAce = checkCardValue(selectedCard, 'A');

    return (isColumnEmpty && isCardAce) || isCorrectFoundationSuit;
  });

  const foundationColumnToUse = getFoundationColumn(foundationColumnNo);

  return foundationColumnToUse;
};
