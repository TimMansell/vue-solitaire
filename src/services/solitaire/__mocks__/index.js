import { mockBoard, mockFoundation, mockDeck } from '@/mockData';

export const initCards = () => mockDeck;

export const initBoard = () => mockBoard;

export const initFoundation = () => mockFoundation;

export const checkHasMoves = ({ hasMoves }) => hasMoves;

export const isBoardEmpty = () => true;

export const checkValidCardMove = ({ validMove }) => validMove;

export const moveCards = () => ({ cards: [] });

export const checkValidFoundationMove = ({ validMove }) => validMove;

export const moveCardsToFoundation = () => ({ cards: [], foundation: [] });

export const getDraggedCards = () => mockBoard;
