import { shallowMount } from '@vue/test-utils';
import PauseGameButton from '@/components/PauseGameButton.vue';

describe('PauseGameButton.vue', () => {
  it('matches pause snapshot', () => {
    const wrapper = shallowMount(PauseGameButton, {
      computed: {
        isGamePaused: () => ({
          paused: false,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches resume snapshot', () => {
    const wrapper = shallowMount(PauseGameButton, {
      computed: {
        isGamePaused: () => ({
          paused: true,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
