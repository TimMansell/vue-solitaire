import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

describe('Timer.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Timer, {
      computed: {
        timer: () => 1,
        isGamePaused: () => ({
          paused: true,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 10 seconds on the timer', () => {
    const wrapper = shallowMount(Timer, {
      computed: {
        timer: () => 10,
        isGamePaused: () => ({
          paused: true,
        }),
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('1');
  });
});
