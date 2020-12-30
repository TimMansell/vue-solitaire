import { shallowMount } from '@vue/test-utils';
import GameWon from '@/components/GameWon.vue';

describe('GameWon.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameWon);

    expect(wrapper).toMatchSnapshot();
  });
});
