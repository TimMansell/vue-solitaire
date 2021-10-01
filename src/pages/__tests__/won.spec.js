import { shallowMount } from '@vue/test-utils';
import Won from '@/pages/Won.vue';

describe('Won.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Won);

    expect(wrapper).toMatchSnapshot();
  });
});
