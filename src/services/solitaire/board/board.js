import { buildCards, dealCards, shuffleCards } from '../cards';
import { checkInitialBoardMoves } from '../moves';

export const getBoardCards = (settings, toShuffle = true) => {
  const { cards, rules } = settings;
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};

export const dealBoardCards = (settings, boardCards) => {
  const hasBoardMoves = checkInitialBoardMoves(boardCards);

  if (!hasBoardMoves) {
    const cards = getBoardCards(settings);

    return dealBoardCards(settings, cards);
  }

  return boardCards;
};
