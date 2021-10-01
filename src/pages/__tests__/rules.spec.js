import { shallowMount } from '@vue/test-utils';
import Rules from '@/pages/Rules.vue';

describe('Rules.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper).toMatchSnapshot();
  });
});
