import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Logo);

    expect(wrapper).toMatchSnapshot();
  });
});
