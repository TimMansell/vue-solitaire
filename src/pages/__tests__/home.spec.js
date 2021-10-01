import { shallowMount } from '@vue/test-utils';
import Home from '@/pages/Home.vue';

describe('Home.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper).toMatchSnapshot();
  });
});
