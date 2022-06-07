import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Header);

    expect(wrapper.isVisible()).toBe(true);
  });
});
