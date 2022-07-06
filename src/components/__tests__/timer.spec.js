import { shallowMount } from '@vue/test-utils';
import Timer from '@/components/Timer.vue';
import { setupStore } from '@@/tests/helpers';

const defaultGetters = {
  isGamePaused: true,
  isEmptyBoard: false,
};

describe('Timer.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Timer, {
      global: {
        mocks: {
          $store: setupStore({ timer: 1, ...defaultGetters }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should show 10 seconds on the timer', () => {
    const wrapper = shallowMount(Timer, {
      global: {
        mocks: {
          $store: setupStore({ timer: 10, ...defaultGetters }),
        },
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('0:00:10');
  });

  it('should show 1m 15s seconds on the timer', () => {
    const wrapper = shallowMount(Timer, {
      global: {
        mocks: {
          $store: setupStore({ timer: 75, ...defaultGetters }),
        },
      },
    });

    expect(wrapper.find('[data-test="timer"]').text()).toContain('0:01:15');
  });
});
