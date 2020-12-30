import { shallowMount } from '@vue/test-utils';
import GamePaused from '@/components/GamePaused.vue';

describe('GamePaused.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GamePaused, {
      computed: {
        isGameActive: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('shows inactive msg', () => {
    const wrapper = shallowMount(GamePaused, {
      computed: {
        isGameActive: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
