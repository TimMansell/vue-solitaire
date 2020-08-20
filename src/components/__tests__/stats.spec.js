import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 1 game played', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
      },
    });

    expect(wrapper.text()).toContain('1');
  });
});
