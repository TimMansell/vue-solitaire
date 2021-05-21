import getters from '../getters';

const { luid, gameHistory } = getters;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const state = {
  luid: mockUid,
  gameHistory: [
    {
      date: '2021-05-20T23:34:49.564Z',
      won: false,
      lost: false,
      moves: 0,
      time: 12,
    },
  ],
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
