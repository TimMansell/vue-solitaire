import { shallowMount } from '@vue/test-utils';
import UserStats from '@/components/UserStats.vue';

const computed = {
  userStats: () => ({
    gameNumber: 1,
  }),
  showStats: () => true,
};

describe('UserStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UserStats, {
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 1 game played', () => {
    const wrapper = shallowMount(UserStats, {
      computed,
    });

    expect(wrapper.find('[data-test="stats"]').text()).toContain('1');
  });

  it('should show user stats overlay', () => {
    const wrapper = shallowMount(UserStats, {
      computed,
    });

    expect(wrapper.find('[data-test="user-stats"]').exists()).toBe(true);
  });
});
