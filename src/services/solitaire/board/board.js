import { buildCards, dealCards, shuffleCards } from '../cards';
import { checkInitialMoves } from '../moves';

export const getBoardCards = (settings, toShuffle = true) => {
  const { cards, rules } = settings;
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};

export const initBoardCards = (settings, boardCards) => {
  const hasBoardMoves = checkInitialMoves(boardCards);

  if (!hasBoardMoves) {
    const cards = getBoardCards(settings);

    return initBoardCards(settings, cards);
  }

  return boardCards;
};
