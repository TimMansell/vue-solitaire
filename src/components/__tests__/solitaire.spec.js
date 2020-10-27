import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
