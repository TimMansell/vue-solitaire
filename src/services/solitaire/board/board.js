import shuffle from 'lodash.shuffle';
import { buildCards, dealCards } from '../cards';

// TODO: test
// eslint-disable-next-line import/prefer-default-export
export const initBoardCards = ({ cards, rules }) => {
  const deck = buildCards(cards);
  const shuffledDeck = shuffle(deck);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};
