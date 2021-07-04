import { shallowMount } from '@vue/test-utils';
import HistoryOverlay from '@/components/HistoryOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('HistoryOverlay.vue', () => {
  it('matches snapshot - no games', () => {
    const wrapper = shallowMount(HistoryOverlay, {
      mocks,
      computed: {
        userGameCount: () => 0,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot - with games', () => {
    const wrapper = shallowMount(HistoryOverlay, {
      mocks,
      computed: {
        userGameCount: () => 4,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not show no games message', () => {
    const wrapper = shallowMount(HistoryOverlay, {
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
    const wrapper = shallowMount(HistoryOverlay, {
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
