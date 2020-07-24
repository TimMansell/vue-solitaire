import { shallowMount } from '@vue/test-utils';
import GameOverlay from '@/components/GameOverlay.vue';

describe('Card.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(GameOverlay);

    expect(wrapper).toMatchSnapshot();
  });
});
