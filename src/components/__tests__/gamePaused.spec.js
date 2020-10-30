import { shallowMount } from '@vue/test-utils';
import GamePaused from '@/components/GamePaused.vue';

describe('GamePaused.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GamePaused, {
      computed: {
        isGamePaused: () => ({
          isPaused: true,
          isActive: true,
          showMsg: true,
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
          isPaused: true,
          isActive: false,
          showMsg: true,
        }),
        hasMoves: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
