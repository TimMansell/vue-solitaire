import { shallowMount } from '@vue/test-utils';
import GameLost from '@/components/GameLost.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('GameLost.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameLost, {
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
