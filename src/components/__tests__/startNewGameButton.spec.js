import { shallowMount } from '@vue/test-utils';
import StartNewGameButton from '@/components/StartNewGameButton.vue';

describe('StartNewGameButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(StartNewGameButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
