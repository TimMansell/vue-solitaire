import { describe, it, expect } from 'vitest';
import tzMock from 'timezone-mock';
import { formatTime, formatTimeFromDate } from '../times';

tzMock.register('UTC');

describe('Time Helpers', () => {
  it('should correctly format time', () => {
    const result = formatTime('245');

    expect(result).toEqual('0:04:05');
  });

  it('should correctly format time from datetime', () => {
    const result = formatTimeFromDate('2021-04-29T12:25:47.907Z');

    expect(result).toEqual('12:25:47');
  });
});
