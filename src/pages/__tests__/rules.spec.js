import { shallowMount } from '@vue/test-utils';
import Rules from '@/pages/Rules.vue';

describe('Rules.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper.isVisible()).toBe(true);
  });
});
