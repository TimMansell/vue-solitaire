import { formatNumber } from '../numbers';

describe('Number Helpers', () => {
  it('should format number correctly', () => {
    const result = formatNumber(1000);

    expect(result).toBe('1,000');
  });
});
