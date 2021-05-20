import { shallowMount } from '@vue/test-utils';
import GameOverlay from '@/components/GameOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('GameOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameOverlay, {
      mocks,
      propsData: {
        showLogo: true,
        btnClose: () => {},
      },
      slots: {
        title: 'Title',
        msg: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        buttons: 'Buttons',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render logo', () => {
    const wrapper = shallowMount(GameOverlay, {
      mocks,
    });

    expect(wrapper.find('[data-test="game-overlay-logo"]').exists()).toBe(
      false
    );
  });

  it('does not render a close button', () => {
    const wrapper = shallowMount(GameOverlay, {
      mocks,
    });

    expect(wrapper.find('[data-test="game-overlay-close"]').exists()).toBe(
      false
    );
  });

  it('renders an alternate overlay class', () => {
    const wrapper = shallowMount(GameOverlay, {
      mocks,
      propsData: {
        alt: true,
      },
    });

    expect(wrapper.classes()).toContain('game-overlay--alt');
  });

  it('renders an center content class', () => {
    const wrapper = shallowMount(GameOverlay, {
      mocks,
      propsData: {
        centerContent: true,
      },
    });

    expect(wrapper.classes()).toContain('game-overlay--centered');
  });
});
