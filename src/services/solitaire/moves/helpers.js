const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line import/prefer-default-export
export const displayMove = ({
  card,
  otherCard,
  isColumn,
  isFoundation,
  hasMove,
}) => {
  if (isDev) {
    const cardMove = otherCard ? `${otherCard?.value}${otherCard?.suit}` : '';
    const columnMove = isColumn ? 'Column' : '';
    const foundationMove = isFoundation ? 'Foundation' : '';

    if (!hasMove) return;

    console.log(
      `${card.value}${card.suit} > ${cardMove}${columnMove}${foundationMove}`
    );
  }
};
