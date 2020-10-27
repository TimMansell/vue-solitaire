import { shallowMount } from '@vue/test-utils';
import GameOverlay from '@/components/GameOverlay.vue';

describe('GameOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameOverlay);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders an alternate overlay class', () => {
    const wrapper = shallowMount(GameOverlay, {
      propsData: {
        alt: true,
      },
    });

    expect(wrapper.classes()).toContain('game-overlay--alt');
  });

  it('renders text in slots', () => {
    const wrapper = shallowMount(GameOverlay, {
      slots: {
        title: 'title',
        msg: 'msg',
        buttons: 'buttons',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
