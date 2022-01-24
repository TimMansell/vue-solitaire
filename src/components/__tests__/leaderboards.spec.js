import tzMock from 'timezone-mock';
import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';
import { mockUid, mockLeaderboardsMoves, mockPlayerName } from '@/mockData';

tzMock.register('UTC');

const mocks = {
  $store: { dispatch: jest.fn() },
  $route: {
    params: {
      showBest: 'moves',
      limit: 25,
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

  it('should set default filters when route params are incorrect format', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks: {
        ...mocks,
        $route: {
          params: {
            showBest: 5000,
            limit: 'abc',
          },
        },
      },
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      showBest: 'moves',
      limit: 25,
    });
  });

  it('should set default filters when route params are correct format but are out of bounds', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks: {
        ...mocks,
        $route: {
          params: {
            showBest: 'time',
            limit: 5000,
          },
        },
      },
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      showBest: 'time',
      limit: 25,
    });
  });

  it('should show correct top message', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.find('[data-test="leaderboards-heading"]').text()).toContain(
      'Top 25 Lowest Moves'
    );
  });

  it('should show correct table headings', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.vm.tableHeadings).toStrictEqual([
      '',
      'Player',
      'Date',
      'Moves',
    ]);
  });

  it('should show correct table items', () => {
    const wrapper = shallowMount(Leaderboards, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.vm.formattedLeaderboards).toStrictEqual([
      {
        date: '29-04-2021',
        moves: 2,
        player: 'Player 1',
        rank: 1,
      },
      {
        date: '29-04-2021',
        moves: 2,
        player: 'Player 2',
        rank: 2,
      },
    ]);
  });
});
