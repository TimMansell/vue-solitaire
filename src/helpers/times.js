import numeral from 'numeral';
import { format, parseISO } from 'date-fns';

export const formatTime = (time) => numeral(time).format('00:00:00');

export const formatTimeFromDate = (date) => format(parseISO(date), 'HH:mm:ss');
