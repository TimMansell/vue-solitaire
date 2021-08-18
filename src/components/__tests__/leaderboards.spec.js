import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '29-04-2021',
    player: 'Player 1',
    moves: 2,
  },
  {
    rank: 2,
    date: '29-04-2021',
    player: 'Player 2',
    moves: 2,
  },
];

const mockPlayerName = 'Player Name';

const mockComputed = {
  leaderboards: () => mockLeaderboardsMoves,
  luid: () => mockUid,
  name: () => mockPlayerName,
};

describe('Leaderboards.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
