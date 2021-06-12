import { shallowMount } from '@vue/test-utils';
import GameHistory from '@/components/GameHistory.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const mockComputed = {
  gameHistory: () => [
    {
      date: '2021-05-20T02:24:30.233Z',
      won: false,
      lost: false,
      moves: 0,
      time: 0,
    },
    {
      date: '2021-05-20T02:24:14.157Z',
      won: false,
      lost: false,
      moves: 0,
      time: 0,
    },
    {
      date: '2021-05-20T02:24:08.397Z',
      won: false,
      lost: false,
      moves: 0,
      time: 0,
    },
    {
      date: '2021-05-14T12:16:17.268Z',
      won: true,
      lost: false,
      moves: 2,
      time: 0,
    },
  ],
  userStats: () => ({
    completed: 4,
  }),
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

  it('should show correct completed games', () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(
      wrapper.find('[data-test="game-history-total-games"]').text()
    ).toContain('4');
  });

  it('should show correct pages', () => {
    const wrapper = shallowMount(GameHistory, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.find('[data-test="game-history-pages"]').text()).toContain(
      'Page: 1 / 1'
    );
  });
});
