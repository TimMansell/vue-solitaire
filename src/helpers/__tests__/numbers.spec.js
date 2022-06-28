import { describe, it, expect } from 'vitest';
import { formatNumber, formatPercent } from '../numbers';

describe('Number Helpers', () => {
  it('should format number correctly', () => {
    const result = formatNumber(1000);

    expect(result).toBe('1,000');
  });

  it('should format correct %', () => {
    const result = formatPercent(1 / 2);

    expect(result).toBe('50.00%');
  });
});
