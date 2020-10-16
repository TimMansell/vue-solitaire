import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        timer: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 10 seconds on the timer', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        timer: () => 10,
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('1');
  });
});
