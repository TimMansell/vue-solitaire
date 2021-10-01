import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire);

    expect(wrapper).toMatchSnapshot();
  });
});
