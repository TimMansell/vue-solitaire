import { shallowMount } from '@vue/test-utils';
import GameState from '@/components/GameState.vue';

describe('GameState.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameState);

    expect(wrapper).toMatchSnapshot();
  });
});
