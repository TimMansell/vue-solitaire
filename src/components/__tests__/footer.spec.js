import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Footer);

    expect(wrapper).toMatchSnapshot();
  });
});
