import { format, parseISO, isValid } from 'date-fns';

export const createISODate = () => new Date().toISOString();

export const formatDate = (date) => format(parseISO(date), 'dd-MM-yyyy');

export const parseAndValidDate = (date) => isValid(parseISO(date));
