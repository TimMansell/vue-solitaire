import { /* getBoardCards, */ initBoardCards } from './board';
import settings from '../settings.json';

import fixture from '../../../../tests/fixtures/boards/noMoves.json';
// import fixture from '../../../../tests/fixtures/boards/aceOnlyMove.json';

export const initBoard = () => {
  // const cards = getBoardCards();
  const { cards } = fixture;

  const boardCards = initBoardCards(cards);

  return boardCards;
};

export const loadBoard = ({ cards }) => cards;

export const updateBoard = ({ boardCards }, { cardsFrom, cardsTo }) =>
  boardCards.map((columnCards, index) => {
    if (index === cardsFrom.columnNo) {
      return cardsFrom.cards;
    }

    if (index === cardsTo?.columnNo) {
      return cardsTo.cards;
    }

    return columnCards;
  });

export const checkEmptyColumns = (cards) =>
  cards.length < settings.rules.columns.length;
