import { createISODate, parseAndValidDate } from '../helpers';

describe('Graphql Helpers', () => {
  it('should be a valid date', () => {
    const date = createISODate();

    expect(parseAndValidDate(date)).toEqual(true);
  });

  it('should not be a valid date', () => {
    const date = '2012-a';

    expect(parseAndValidDate(date)).toEqual(false);
  });
});
