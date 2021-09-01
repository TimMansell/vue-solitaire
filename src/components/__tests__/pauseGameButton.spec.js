import { shallowMount } from '@vue/test-utils';
import PauseGameButton from '@/components/PauseGameButton.vue';

describe('PauseGameButton.vue', () => {
  it('matches pause snapshot', () => {
    const wrapper = shallowMount(PauseGameButton, {
      computed: {
        isGamePaused: () => false,
        isGameLoading: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches resume snapshot', () => {
    const wrapper = shallowMount(PauseGameButton, {
      computed: {
        isGamePaused: () => true,
        isGameLoading: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
