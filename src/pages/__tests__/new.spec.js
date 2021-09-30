import { shallowMount } from '@vue/test-utils';
import New from '@/pages/New.vue';

describe('New.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(New);

    expect(wrapper).toMatchSnapshot();
  });
});
