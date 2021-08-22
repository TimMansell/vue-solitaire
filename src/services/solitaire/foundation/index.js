import { getSelectedCard, checkCardValue } from '../cards';
import {
  checkEmptyFoundationColumn,
  checkFoundationColumnSuit,
  getFoundationColumn,
} from './foundation';
import { foundationColumns } from '../settings.json';

export const initFoundation = () => foundationColumns.map(() => []);

export const updateFoundation = ({ foundation }, { cardsTo }) =>
  foundation.map((columnCards, index) => {
    if (index === cardsTo.columnNo) {
      return cardsTo.columnCards;
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
