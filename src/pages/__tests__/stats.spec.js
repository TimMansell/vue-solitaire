import { shallowMount } from '@vue/test-utils';
import Stats from '@/pages/Stats.vue';

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats);

    expect(wrapper).toMatchSnapshot();
  });
});
