import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Header);

    expect(wrapper).toMatchSnapshot();
  });
});
