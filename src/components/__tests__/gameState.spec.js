import { shallowMount } from '@vue/test-utils';
import GameState from '@/components/GameState.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('GameState.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => true,
        isGameWon: () => true,
        isGameLost: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render game won if there are moves', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => true,
        isGameWon: () => false,
        isGameLost: () => false,
      },
    });

    expect(wrapper.find('[data-test="game-won"]').exists()).toBe(false);
  });

  it('should not render game lost if there are moves', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => true,
        isGameWon: () => false,
        isGameLost: () => false,
      },
    });

    expect(wrapper.find('[data-test="game-lost"]').exists()).toBe(false);
  });
});
