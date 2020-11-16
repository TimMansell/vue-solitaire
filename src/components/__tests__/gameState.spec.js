import { shallowMount } from '@vue/test-utils';
import GameState from '@/components/GameState.vue';
import GameWon from '@/components/GameWon.vue';
import GameLost from '@/components/GameLost.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('GameState.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => false,
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
        isGameWon: () => true,
        isGameLost: () => false,
      },
    });

    expect(wrapper.findComponent(GameWon).exists()).toBe(false);
  });

  it('should not render game lost if there are moves', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => true,
        isGameWon: () => false,
        isGameLost: () => true,
      },
    });

    expect(wrapper.findComponent(GameLost).exists()).toBe(false);
  });

  it('should render game won if there are no moves', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => false,
        isGameWon: () => true,
        isGameLost: () => false,
      },
    });

    expect(wrapper.findComponent(GameWon).exists()).toBe(true);
  });

  it('should render game lost if there are no moves', () => {
    const wrapper = shallowMount(GameState, {
      mocks,
      computed: {
        hasMoves: () => false,
        isGameWon: () => false,
        isGameLost: () => true,
      },
    });

    expect(wrapper.findComponent(GameLost).exists()).toBe(true);
  });
});
