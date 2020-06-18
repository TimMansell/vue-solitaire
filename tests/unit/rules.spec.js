import { shallowMount } from '@vue/test-utils';
import Rules from '@/components/Rules.vue';

describe('Rules.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper).toMatchSnapshot();
  });
});
