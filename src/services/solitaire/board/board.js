import { buildCards, dealCards, shuffleCards } from '../cards';
import { checkHasMoves } from '../moves';
// import fixture from '../../../../tests/fixtures/boards/noMoves.json';
import fixture from '../../../../tests/fixtures/boards/aceOnlyMove.json';

export const initBoard = ({ cards, rules }, toShuffle = true) => {
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};

export const setBoardCards = (boardCards, settings) => {
  const foundationCards = [[], [], [], []];
  const hasBoardMoves = checkHasMoves({ boardCards, foundationCards });

  const cards = hasBoardMoves ? boardCards : setBoardCards(initBoard(settings));

  return cards;
};

export const initBoardCards = (settings) => {
  // const cards = initBoard(settings);
  const { cards } = fixture;

  const boardCards = setBoardCards(cards, settings);

  return boardCards;
};
