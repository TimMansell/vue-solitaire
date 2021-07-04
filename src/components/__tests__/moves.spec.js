import { shallowMount } from '@vue/test-utils';
import Moves from '@/components/Moves.vue';

describe('Moves.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Moves, {
      computed: {
        moves: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
