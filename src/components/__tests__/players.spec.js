import { shallowMount } from '@vue/test-utils';
import Players from '@/components/Players.vue';

describe('Players.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Players, {
      computed: {
        playerCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
