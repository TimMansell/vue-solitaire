import { shallowMount } from '@vue/test-utils';
import NoGames from '@/components/NoGames.vue';

describe('NoGames.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(NoGames);

    expect(wrapper).toMatchSnapshot();
  });
});
