import { shallowMount } from '@vue/test-utils';
import PauseGameButton from '@/components/PauseGameButton.vue';

describe('PauseGameButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(PauseGameButton);

    expect(wrapper).toMatchSnapshot();
  });
});
