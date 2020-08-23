import { initFoundation, loadFoundation } from '../foundation';
import { initBoard, loadBoard } from '../board';

export const getSavedGameState = () => JSON.parse(localStorage.getItem('game'));

export const checkSavedGameState = () => getSavedGameState() !== null;

export const newGameState = (board) => {
  return {
    foundationCards: board ? loadFoundation(board) : initFoundation(),
    boardCards: board ? loadBoard(board) : initBoard(),
  };
};

export const loadGameState = () => {
  const { board } = getSavedGameState();

  return {
    foundationCards: board.foundation,
    boardCards: board.columns,
  };
};

export const initGameState = (board) => {
  const isGameSaved = checkSavedGameState();

  const cards = isGameSaved ? loadGameState() : newGameState(board);

  return cards;
};

export const setSaveGameState = (gameState) =>
  localStorage.setItem('game', JSON.stringify(gameState));

export const removeSavedGameState = () => localStorage.removeItem('game');
