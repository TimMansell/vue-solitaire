import { shallowMount } from '@vue/test-utils';
import GamePaused from '@/components/GamePaused.vue';

describe('GamePaused.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GamePaused, {
      computed: {
        isGamePaused: () => ({
          paused: true,
          active: true,
        }),
        hasMoves: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('shows inactive msg', () => {
    const wrapper = shallowMount(GamePaused, {
      computed: {
        isGamePaused: () => ({
          paused: true,
          active: false,
        }),
        hasMoves: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
