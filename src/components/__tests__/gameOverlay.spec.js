import { shallowMount } from '@vue/test-utils';
import GameOverlay from '@/components/GameOverlay.vue';

describe('GameOverlay.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GameOverlay, {
      props: {
        showLogo: true,
        showClose: true,
      },
      slots: {
        title: 'Title',
        msg: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        buttons: 'Buttons',
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('does not render logo', () => {
    const wrapper = shallowMount(GameOverlay);

    expect(wrapper.find('[data-test="game-overlay-logo"]').exists()).toBe(
      false
    );
  });

  it('does not render a close button', () => {
    const wrapper = shallowMount(GameOverlay);

    expect(wrapper.find('[data-test="game-overlay-close"]').exists()).toBe(
      false
    );
  });

  it('renders an center content class', () => {
    const wrapper = shallowMount(GameOverlay, {
      props: {
        centerContent: true,
      },
    });

    expect(wrapper.classes()).toContain('game-overlay--centered');
  });

  it('renders a see-through class', () => {
    const wrapper = shallowMount(GameOverlay, {
      props: {
        isVisible: false,
      },
    });

    expect(wrapper.classes()).toContain('game-overlay--see-through');
  });
});
