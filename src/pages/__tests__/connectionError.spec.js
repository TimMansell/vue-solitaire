import { shallowMount } from '@vue/test-utils';
import ConnectionError from '@/pages/ConnectionError.vue';

describe('ConnectionError.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ConnectionError);

    expect(wrapper.isVisible()).toBe(true);
  });
});
