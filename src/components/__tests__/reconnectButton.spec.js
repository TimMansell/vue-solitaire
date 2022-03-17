import { shallowMount } from '@vue/test-utils';
import ReconnectButton from '@/components/ReconnectButton.vue';

describe('ReconnectButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ReconnectButton);

    expect(wrapper).toMatchSnapshot();
  });
});
