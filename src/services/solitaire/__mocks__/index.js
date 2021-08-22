export const initBoard = () => [['card 1'], ['card 2']];

export const initFoundation = () => [
  ['foundation card 1'],
  ['foundation card 2'],
];

export const checkHasMoves = ({ hasMoves }) => hasMoves;

export const isBoardEmpty = () => true;

export const checkValidCardMove = ({ validMove }) => validMove;

export const moveCards = () => ({ cards: [] });

export const checkValidFoundationMove = ({ validMove }) => validMove;

export const moveCardsToFoundation = () => ({ cards: [], foundation: [] });

export const getDraggedCards = () => [['card 1'], ['card 2']];
