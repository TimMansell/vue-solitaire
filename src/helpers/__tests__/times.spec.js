import { formatTime } from '../times';

describe('Time Helpers', () => {
  it('should correctly format time', () => {
    const result = formatTime('245');

    expect(result).toEqual('0:04:05');
  });
});
