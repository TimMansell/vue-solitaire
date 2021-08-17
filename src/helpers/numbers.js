import numeral from 'numeral';

// eslint-disable-next-line import/prefer-default-export
export const formatNumber = (value) => numeral(value).format('0,0');
