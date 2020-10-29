import { shallowMount } from '@vue/test-utils';
import UserStatsOverlay from '@/components/UserStatsOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('UserStatsOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UserStatsOverlay, {
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
