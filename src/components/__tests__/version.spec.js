import { shallowMount } from '@vue/test-utils';
import Version from '@/components/Version.vue';
import { setupStore } from '@@/tests/helpers';

describe('Version.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Version, {
      global: {
        mocks: {
          $store: setupStore({
            version: '1.0.0',
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
