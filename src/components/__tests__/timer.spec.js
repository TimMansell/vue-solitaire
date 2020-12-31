import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';

describe('Timer.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Timer, {
      computed: {
        timer: () => 1,
        isTimerPaused: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 10 seconds on the timer', () => {
    const wrapper = shallowMount(Timer, {
      computed: {
        timer: () => 10,
        isTimerPaused: () => true,
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('0:00:10');
  });

  it('should show 1m 15s seconds on the timer', () => {
    const wrapper = shallowMount(Timer, {
      computed: {
        timer: () => 75,
        isTimerPaused: () => true,
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('0:01:15');
  });
});
