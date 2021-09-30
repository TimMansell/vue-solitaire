import { shallowMount } from '@vue/test-utils';
import Pause from '@/pages/Pause.vue';

describe('Pause.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Pause);

    expect(wrapper).toMatchSnapshot();
  });
});
