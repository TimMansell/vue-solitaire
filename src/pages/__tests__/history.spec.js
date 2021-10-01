import { shallowMount } from '@vue/test-utils';
import History from '@/pages/History.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('History.vue', () => {
  it('matches snapshot - no games', () => {
    const wrapper = shallowMount(History, {
      mocks,
      computed: {
        userGameCount: () => 0,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot - with games', () => {
    const wrapper = shallowMount(History, {
      mocks,
      computed: {
        userGameCount: () => 4,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not show no games message', () => {
    const wrapper = shallowMount(History, {
      mocks,
      computed: {
        userGameCount: () => 4,
      },
    });

    expect(
      wrapper.find('[data-test="game-history-no-games-msg"]').exists()
    ).toBe(false);
  });

  it('should show no games message', () => {
    const wrapper = shallowMount(History, {
      mocks,
      computed: {
        userGameCount: () => 0,
      },
    });

    expect(
      wrapper.find('[data-test="game-history-no-games-msg"]').exists()
    ).toBe(true);
  });
});
