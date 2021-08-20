import { mockUid, mockHistory } from '@/mockData';
import getters from '../getters';

const { luid, gameHistory } = getters;

const state = {
  luid: mockUid,
  gameHistory: mockHistory,
};

describe('User Store', () => {
  it('luid', () => {
    const result = luid(state);

    expect(result).toEqual(state.luid);
  });

  it('gameHistory', () => {
    const result = gameHistory(state);

    expect(result).toEqual(state.gameHistory);
  });
});
