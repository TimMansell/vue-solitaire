import { initFoundation, loadFoundation } from '../foundation';
import { initBoard, loadBoard } from '../board';

export const getSavedGameState = () => JSON.parse(localStorage.getItem('game'));

export const initGameState = (board) => {
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

export const saveGameState = (gameState) => localStorage.setItem('game', JSON.stringify(gameState));

export const removeSavedGameState = () => localStorage.removeItem('game');

export const checkSavedGameState = () => getSavedGameState() !== null;
