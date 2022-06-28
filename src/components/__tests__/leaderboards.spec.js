import { describe, it, expect, vi } from 'vitest';
import tzMock from 'timezone-mock';
import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/components/Leaderboards.vue';
import { mockUid, mockLeaderboardsMoves, mockPlayerName } from '@/mockData';
import { setupStore, setupRoute } from '@@/tests/helpers';

tzMock.register('UTC');

const global = {
  mocks: {
    $store: setupStore({
      dispatch: vi.fn(),
      leaderboards: mockLeaderboardsMoves,
      luid: mockUid,
      name: mockPlayerName,
    }),
    $route: setupRoute({
      showBest: 'moves',
      limit: 25,
    }),
  },
};

describe('Leaderboards.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Leaderboards, {
      global,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should set default filters when route params are incorrect format', () => {
    const wrapper = shallowMount(Leaderboards, {
      global: {
        mocks: {
          ...global.mocks,
          $route: setupRoute({
            showBest: 5000,
            limit: 'abc',
          }),
        },
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      showBest: 'moves',
      limit: 25,
    });
  });

  it('should set default filters when route params are correct format but are out of bounds', () => {
    const wrapper = shallowMount(Leaderboards, {
      global: {
        mocks: {
          ...global.mocks,
          $route: setupRoute({
            showBest: 'time',
            limit: 5000,
          }),
        },
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      showBest: 'time',
      limit: 25,
    });
  });

  it('should show correct top message', () => {
    const wrapper = shallowMount(Leaderboards, {
      global,
    });

    expect(wrapper.find('[data-test="leaderboards-heading"]').text()).toContain(
      'Top 25 Lowest Moves'
    );
  });

  it('should show correct table headings', () => {
    const wrapper = shallowMount(Leaderboards, {
      global,
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
      global,
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
