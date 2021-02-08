/* eslint-disable no-undef */

const solitaire = () => ({
  init: () => jest.fn(),
  isEmptyBoard: () => true,
  getFoundationCards: () => [],
  getBoardCards: () => [],
  hasMoves: () => false,
  setSelectedCard: () => 1,
  removeSelectedCard: () => jest.fn(),
  findEmptyFoundationColumn: () => 0,
  isValidCardMove: () => true,
  moveCards: () => jest.fn(),
  isValidFoundationMove: () => true,
  moveCardsToFoundation: () => jest.fn(),
  setBoard: () => jest.fn(),
  setFoundation: () => jest.fn(),
  getDraggedCards: () => [],
});

export default solitaire();

/* eslint-enable no-undef */
