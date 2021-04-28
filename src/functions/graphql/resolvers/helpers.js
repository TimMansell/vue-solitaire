import { parseISO, isValid } from 'date-fns';

export const createISODate = () => new Date().toISOString();

export const parseAndValidDate = (date) => isValid(parseISO(date));
