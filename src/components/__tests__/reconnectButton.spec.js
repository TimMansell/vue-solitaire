import { shallowMount } from '@vue/test-utils';
import ReconnectButton from '@/components/ReconnectButton.vue';

describe('ReconnectButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ReconnectButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
