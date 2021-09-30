import { shallowMount } from '@vue/test-utils';
import GameHistory from '@/components/GameHistory.vue';
import { mockHistory } from '@/mockData';

const mocks = {
  $store: { dispatch: jest.fn() },
  $route: {
    params: {
      page: 1,
      limit: 25,
    },
  },
};

const mockComputed = {
  gameHistory: () => mockHistory,
  userGameCount: () => mockHistory.length,
};

describe('GameHistory.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show correct completed games message', () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(
      wrapper.find('[data-test="game-history-total-games"]').text()
    ).toContain('You have played a total of 4 games');
  });

  it('should show correct pages', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: 3 } });

    expect(wrapper.find('[data-test="game-history-pages"]').text()).toContain(
      'Page: 1 / 2'
    );
  });

  it('should show correct showing games message ', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: 3 } });

    expect(
      wrapper
        .find('[data-test="game-history-showing-games"]')
        .text()
        .replace(/\s+/g, ' ')
    ).toContain(`Showing games ${mockHistory.length} to 2`);
  });

  it('should show correct showing games message if on last page', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: mockHistory.length } });

    expect(
      wrapper
        .find('[data-test="game-history-showing-games"]')
        .text()
        .replace(/\s+/g, ' ')
    ).toContain(`Showing games ${mockHistory.length} to 1`);
  });

  it('should show correct placeholder rows', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: 2 } });

    expect(wrapper.vm.pageRows).toBe(2);
  });

  it('should show correct placeholder rows if rows are the same as limit', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: mockHistory.length } });

    expect(wrapper.vm.pageRows).toBe(mockHistory.length);
  });

  it('should show correct placeholder rows for last page', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ filters: { limit: 3, page: 2 } });

    expect(wrapper.vm.pageRows).toBe(1);
  });
});
