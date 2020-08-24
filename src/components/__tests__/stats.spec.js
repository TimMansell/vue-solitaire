import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
        timer: () => 1,
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
        timer: () => 1,
      },
    });

    expect(wrapper.find('[data-test="stats"]').text()).toContain('1');
  });

  it('should show 10 seconds on the timer', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        userStats: () => ({
          gameNumber: 1,
        }),
        timer: () => 10,
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('1');
  });
});
