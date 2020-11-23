import { shallowMount } from '@vue/test-utils';
import GameWon from '@/components/GameWon.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('GameWon.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameWon, {
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
