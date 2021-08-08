import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const mockUid = 'f5c6a829-f0da-4dfc-81a0-e6419f0163c7';

const mockLeaderboardsMoves = [
  {
    rank: 1,
    date: '2021-04-29T12:25:47.907Z',
    uid: '7dac9d78-353f-409b-8a7f-2192409c44a2',
    moves: 2,
  },
  {
    rank: 2,
    date: '2021-04-29T12:26:20.825Z',
    uid: '2cbf658a-3102-4e9d-b749-bac853efed0d',
    moves: 2,
  },
];

const mockComputed = {
  leaderboards: () => mockLeaderboardsMoves,
  luid: () => mockUid,
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
