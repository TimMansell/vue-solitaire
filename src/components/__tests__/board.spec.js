import { shallowMount } from '@vue/test-utils';
import Board from '@/components/Board.vue';

describe('Board.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Board);

    expect(wrapper).toMatchSnapshot();
  });
});
