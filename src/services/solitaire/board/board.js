import { buildCards, dealCards, shuffleCards } from '../cards';
import { checkInitialMoves } from '../moves';
import settings from '../settings.json';

export const getBoardCards = (toShuffle = true) => {
  const { cards, rules } = settings;
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};

export const initBoardCards = (boardCards) => {
  const hasBoardMoves = checkInitialMoves(boardCards);

  if (!hasBoardMoves) {
    const cards = getBoardCards();

    return initBoardCards(cards);
  }

  return boardCards;
};
