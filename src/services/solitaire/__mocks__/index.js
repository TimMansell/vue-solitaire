/* eslint-disable no-undef */

const solitaire = () => ({
  init: () => jest.fn(),
  isEmptyBoard: () => true,
  getFoundationCards: () => [],
  getBoardCards: () => [],
  hasMoves: () => false,
  setSelectedCard: () => 1,
  findEmptyFoundationColumn: () => 0,
  isValidCardMove: () => true,
  moveCards: () => jest.fn(),
  isValidFoundationMove: () => true,
  moveCardsToFoundation: () => jest.fn(),
  setBoard: () => jest.fn(),
  setFoundation: () => jest.fn(),
});

export default solitaire();

/* eslint-enable no-undef */
