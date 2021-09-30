import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';
import { mockUid, mockLeaderboardsMoves, mockPlayerName } from '@/mockData';

const mocks = {
  $store: { dispatch: jest.fn() },
  $route: {
    params: {
      limit: 25,
      showBest: 'moves',
    },
  },
};

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
