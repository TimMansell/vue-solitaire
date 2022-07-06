import numeral from 'numeral';

// eslint-disable-next-line import/prefer-default-export
export const formatTime = (time) => numeral(time).format('00:00:00');
