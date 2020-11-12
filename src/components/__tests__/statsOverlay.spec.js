import { shallowMount } from '@vue/test-utils';
import StatsOverlay from '@/components/StatsOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('StatsOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(StatsOverlay, {
      computed: {
        fullUserStats: () => ({
          count: 4,
          won: 1,
          lost: 1,
          completed: 2,
        }),
      },
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
