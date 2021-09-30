import { shallowMount } from '@vue/test-utils';
import StartNewGameButton from '@/components/StartNewGameButton.vue';

describe('StartNewGameButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(StartNewGameButton);

    expect(wrapper).toMatchSnapshot();
  });
});
