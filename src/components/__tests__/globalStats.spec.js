import { shallowMount } from '@vue/test-utils';
import GlobalStats from '@/components/GlobalStats.vue';

describe('GlobalStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GlobalStats, {
      computed: {
        globalStats: () => ({
          count: 1,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
