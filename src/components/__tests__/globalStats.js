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

  it('should show 1 game played', () => {
    const wrapper = shallowMount(GlobalStats, {
      computed: {
        globalStats: () => ({
          count: 1,
        }),
      },
    });

    expect(wrapper.find('[data-test="stats"]').text()).toContain('1');
  });
});
