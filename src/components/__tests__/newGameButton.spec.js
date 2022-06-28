import { shallowMount } from '@vue/test-utils';
import NewGameButton from '@/components/NewGameButton.vue';

describe('NewGameButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(NewGameButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
