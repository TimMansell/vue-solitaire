import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

describe('Solitaire.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Solitaire);

    expect(wrapper.isVisible()).toBe(true);
  });
});
