import { shallowMount } from '@vue/test-utils';
import GameHistory, {
  calcNumber,
  gameOutcome,
} from '@/components/GameHistory.vue';

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
  userGameCount: () => 4,
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

  it('should format number correctly', () => {
    const result = calcNumber(1000);

    expect(result).toBe('1,000');
  });

  it('should return Won in gameOutcome', () => {
    const result = gameOutcome({ won: true, lost: false });

    expect(result).toBe('Won');
  });

  it('should return Lost in gameOutcome', () => {
    const result = gameOutcome({ won: false, lost: true });

    expect(result).toBe('Lost');
  });

  it('should return Gave Up in gameOutcome', () => {
    const result = gameOutcome({ won: false, lost: false });

    expect(result).toBe('Gave Up');
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
    ).toContain('Showing games 4 to 2');
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
