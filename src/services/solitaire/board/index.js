import { initBoardCards } from './board';
import settings from '../settings.json';

export const initBoard = () => initBoardCards(settings);

export const loadBoard = ({ board }) => board;

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

export const checkEmptyColumns = (cards) => cards.length < settings.rules.columns.length;
