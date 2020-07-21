import { initCards } from './cards';
import { checkValidCardMove, checkHasMoves, moveCardsFrom, moveCardsTo } from './moves';
import {
  initFoundations,
  updateFoundation,
  getEmptyFoundationColumn,
  checkValidFoundationMove,
  moveFoundationCardsTo,
} from './foundation';
import { initBoard, updateBoard } from './board';
import setState from './state';
import settings from './settings.json';

const solitaire = () => {
  let state = setState({});

  const setGameState = (newState) => {
    state = setState(state, newState);
  };

  const init = () => {
    const foundationCards = initFoundations(settings);
    const deck = initCards(settings);
    const boardCards = initBoard(settings, deck);

    setGameState({
      foundationCards,
      deck,
      boardCards,
    });
  };

  const setBoard = ({ board }) => setGameState({ boardCards: [...board] });

  const setFoundation = ({ foundation }) => setGameState({ foundationCards: [...foundation] });

  const setSelectedCard = (selectedCardId) => setGameState({ selectedCardId });

  const removeSelectedCard = () => setGameState({ selectedCardId: null });

  const moveCards = (selectedColumn) => {
    const cardsFromColumn = moveCardsFrom(state);
    const cardsToColumn = moveCardsTo(state, selectedColumn);
    const boardCards = updateBoard(state, cardsFromColumn, cardsToColumn);

    setGameState({ boardCards });
  };

  const isValidCardMove = (selectedColumn) => checkValidCardMove(state, selectedColumn);

  const findEmptyFoundationColumn = () => getEmptyFoundationColumn(state);

  const moveCardsToFoundation = (selectedColumn) => {
    const cardsFromColumn = moveCardsFrom(state);
    const cardsToColumn = moveFoundationCardsTo(state, selectedColumn);
    const boardCards = updateBoard(state, cardsFromColumn);
    const foundationCards = updateFoundation(state, cardsToColumn);

    setGameState({
      foundationCards,
      boardCards,
    });
  };

  const isValidFoundationMove = (selectedColumn) => checkValidFoundationMove(state, selectedColumn);

  const isEmptyBoard = () => !state.boardCards.flat().length;

  const hasMoves = () => checkHasMoves(state);

  const getBoardCards = () => state.boardCards;

  const getFoundationCards = () => state.foundationCards;

  return {
    init,
    setBoard,
    setFoundation,
    isEmptyBoard,
    getFoundationCards,
    getBoardCards,
    setSelectedCard,
    removeSelectedCard,
    hasMoves,
    isValidCardMove,
    isValidFoundationMove,
    moveCards,
    moveCardsToFoundation,
    findEmptyFoundationColumn,
  };
};

export default solitaire();
