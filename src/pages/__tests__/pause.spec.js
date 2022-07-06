import { shallowMount } from '@vue/test-utils';
import Pause from '@/pages/Pause.vue';

describe('Pause.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Pause);

    expect(wrapper.isVisible()).toBe(true);
  });
});
