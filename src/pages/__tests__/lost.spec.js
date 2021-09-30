import { shallowMount } from '@vue/test-utils';
import Lost from '@/pages/Lost.vue';

describe('Lost.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Lost);

    expect(wrapper).toMatchSnapshot();
  });
});
