import { shallowMount } from '@vue/test-utils';
import ConnectingAlert from '@/components/ConnectingAlert.vue';

describe('ConnectingAlert.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ConnectingAlert, {
      computed: {
        isConnecting: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show alert', () => {
    const wrapper = shallowMount(ConnectingAlert, {
      computed: {
        isConnecting: () => true,
      },
    });

    expect(wrapper.findAll('[data-test="connecting-alert"]').exists()).toBe(
      true
    );
  });

  it('should not show alert', () => {
    const wrapper = shallowMount(ConnectingAlert, {
      computed: {
        isConnecting: () => false,
      },
    });

    expect(wrapper.findAll('[data-test="connecting-alert"]').exists()).toBe(
      false
    );
  });
});
