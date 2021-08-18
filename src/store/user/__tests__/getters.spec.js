import getters from '../getters';

const { luid, gameHistory } = getters;

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockHistory = [
  {
    date: '21-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 1,
    number: '4',
    outcome: 'Gave Up',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '3',
    outcome: 'Won',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '2',
    outcome: 'Lost',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: 2,
    number: '1',
    outcome: 'Won',
  },
];

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
