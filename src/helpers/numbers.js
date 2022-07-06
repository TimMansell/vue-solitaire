import numeral from 'numeral';

export const formatNumber = (value) => numeral(value).format('0,0');

export const formatPercent = (value) => numeral(value).format('0.00%');
