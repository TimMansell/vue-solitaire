import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Footer);

    expect(wrapper.isVisible()).toBe(true);
  });
});
