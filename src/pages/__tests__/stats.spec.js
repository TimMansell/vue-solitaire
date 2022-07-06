import { shallowMount } from '@vue/test-utils';
import Stats from '@/pages/Stats.vue';

describe('Stats.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Stats);

    expect(wrapper.isVisible()).toBe(true);
  });
});
