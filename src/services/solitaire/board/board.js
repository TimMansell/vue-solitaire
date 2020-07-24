import { buildCards, dealCards, shuffleCards } from '../cards';

// eslint-disable-next-line import/prefer-default-export
export const initBoardCards = ({ cards, rules }, toShuffle = true) => {
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};
