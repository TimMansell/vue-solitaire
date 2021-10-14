import { shallowMount } from '@vue/test-utils';
import OfflineAlert from '@/components/OfflineAlert.vue';

describe('OfflineAlert.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(OfflineAlert, {
      computed: {
        isOnline: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show alert', () => {
    const wrapper = shallowMount(OfflineAlert, {
      computed: {
        isOnline: () => false,
      },
    });

    expect(wrapper.findAll('[data-test="offline-alert"]').exists()).toBe(true);
  });

  it('should not show alert', () => {
    const wrapper = shallowMount(OfflineAlert, {
      computed: {
        isOnline: () => true,
      },
    });

    expect(wrapper.findAll('[data-test="offline-alert"]').exists()).toBe(false);
  });
});
