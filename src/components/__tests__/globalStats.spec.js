import { shallowMount } from '@vue/test-utils';
import GlobalStats from '@/components/GlobalStats.vue';

describe('GlobalStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GlobalStats, {
      computed: {
        playerCount: () => 1,
        globalGameCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
