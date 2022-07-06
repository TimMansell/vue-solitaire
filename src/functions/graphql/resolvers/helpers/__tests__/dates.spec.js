import tzMock from 'timezone-mock';
import { createISODate, parseAndValidDate, formatDate } from '../dates';

tzMock.register('UTC');

describe('Date Helpers', () => {
  it('should be a valid date', () => {
    const date = createISODate();

    expect(parseAndValidDate(date)).toEqual(true);
  });

  it('should not be a valid date', () => {
    const date = '2012-a';

    expect(parseAndValidDate(date)).toEqual(false);
  });

  it('should correctly format date', () => {
    const result = formatDate('2021-04-29T12:25:47.907Z');

    expect(result).toEqual('29-04-2021');
  });
});
