import { shallowMount } from '@vue/test-utils';
import GameHistory from '@/components/GameHistory.vue';

const mockHistory = [
  {
    date: '21-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: '1',
    number: '1',
    outcome: 'Gave Up',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: '2',
    number: '2',
    outcome: 'Won',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: '2',
    number: '3',
    outcome: 'Lost',
  },
  {
    date: '20-05-2021',
    time: '09:34:49',
    duration: '0:00:12',
    moves: '2',
    number: '4',
    outcome: 'Won',
  },
];

const mocks = {
  $store: { dispatch: jest.fn() },
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

    await wrapper.setData({ limit: 3 });

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

    await wrapper.setData({ limit: 3 });

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

    await wrapper.setData({ limit: mockHistory.length });

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

    await wrapper.setData({ limit: 2 });

    expect(wrapper.vm.pageRows).toBe(2);
  });

  it('should show correct placeholder rows if rows are the same as limit', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ limit: mockHistory.length });

    expect(wrapper.vm.pageRows).toBe(mockHistory.length);
  });

  it('should show correct placeholder rows for last page', async () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    await wrapper.setData({ limit: 3 });
    await wrapper.setData({ page: 2 });

    expect(wrapper.vm.pageRows).toBe(1);
  });
});
