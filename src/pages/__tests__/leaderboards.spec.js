import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/pages/Leaderboards.vue';

describe('Leaderboards.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Leaderboards);

    expect(wrapper).toMatchSnapshot();
  });
});
