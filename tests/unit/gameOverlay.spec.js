import { shallowMount } from '@vue/test-utils';
import GameOverlay from '@/components/GameOverlay.vue';

describe('Card.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(GameOverlay);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls buttonClick method', () => {
    const wrapper = shallowMount(GameOverlay);

    wrapper.vm.buttonClick();

    expect(wrapper.emitted().buttonClick).toBeTruthy();
  });
});
