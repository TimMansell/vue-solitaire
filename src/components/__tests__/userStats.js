import { shallowMount } from '@vue/test-utils';
import UserStats from '@/components/UserStats.vue';

describe('UserStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UserStats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 1 game played', () => {
    const wrapper = shallowMount(UserStats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
      },
    });

    expect(wrapper.find('[data-test="stats"]').text()).toContain('1');
  });
});
