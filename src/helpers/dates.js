import { format, parseISO } from 'date-fns';

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date) => format(parseISO(date), 'dd-MM-yyyy');
