import { shallowMount } from '@vue/test-utils';
import GameLost from '@/components/GameLost.vue';

describe('GameLost.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameLost, {
      computed: {
        isOverlayVisible: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
