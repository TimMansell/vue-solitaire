import { shallowMount } from '@vue/test-utils';
import HomeButton from '@/components/HomeButton.vue';

describe('HomeButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(HomeButton);

    expect(wrapper).toMatchSnapshot();
  });
});
