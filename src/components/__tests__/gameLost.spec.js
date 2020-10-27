import { shallowMount } from '@vue/test-utils';
import GameLost from '@/components/GameLost.vue';

describe('GameLost.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameLost, {
      computed: {
        isGameLost: () => true,
        hasMoves: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
