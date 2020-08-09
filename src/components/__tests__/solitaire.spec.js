import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

const mockStore = {
  $store: { dispatch: jest.fn() },
};

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks: {
        ...mockStore,
      },
      computed: {
        isGameWon: () => false,
        hasMoves: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches game won snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks: {
        ...mockStore,
      },
      computed: {
        isGameWon: () => true,
        hasMoves: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches game lost snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks: {
        ...mockStore,
      },
      computed: {
        isGameWon: () => false,
        hasMoves: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
