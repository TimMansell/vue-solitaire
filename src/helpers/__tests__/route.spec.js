import { formatRoute } from '../route';

describe('Route', () => {
  it('should format string into correct object', () => {
    const route = 'test';

    const result = formatRoute(route);

    expect(result).toEqual({ name: 'test' });
  });

  it('should return obj', () => {
    const route = { name: 'test' };

    const result = formatRoute(route);

    expect(result).toEqual({ name: 'test' });
  });
});
