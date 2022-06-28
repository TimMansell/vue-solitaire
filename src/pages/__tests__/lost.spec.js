import { shallowMount } from '@vue/test-utils';
import Lost from '@/pages/Lost.vue';

describe('Lost.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Lost);

    expect(wrapper.isVisible()).toBe(true);
  });
});
