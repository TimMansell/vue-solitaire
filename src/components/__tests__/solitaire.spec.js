import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        isGameWon: () => false,
        isGameLost: () => false,
        hasMoves: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches game won snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        isGameWon: () => true,
        isGameLost: () => false,
        hasMoves: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches game lost snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        isGameWon: () => false,
        isGameLost: () => true,
        hasMoves: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
