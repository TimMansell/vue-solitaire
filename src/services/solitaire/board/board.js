import { buildCards, dealCards, shuffleCards } from '../cards';
import { checkHasMoves } from '../moves';
import { initFoundation } from '../foundation';

export const checkInitialBoardMoves = (boardCards) => {
  const foundationCards = initFoundation();

  const board = {
    foundationCards,
    boardCards,
  };

  const hasBoardMoves = checkHasMoves(board);

  return hasBoardMoves;
};

export const getBoardCards = (settings, toShuffle = true) => {
  const { cards, rules } = settings;
  const deck = buildCards(cards);
  const shuffledDeck = shuffleCards(deck, toShuffle);
  const boardCards = dealCards(shuffledDeck, rules);

  return boardCards;
};

export const initBoardCards = (settings, boardCards) => {
  const hasBoardMoves = checkInitialBoardMoves(boardCards);

  if (!hasBoardMoves) {
    const cards = getBoardCards(settings);

    return initBoardCards(settings, cards);
  }

  return boardCards;
};
