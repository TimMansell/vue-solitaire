import { shallowMount } from '@vue/test-utils';
import NoGames from '@/components/NoGames.vue';

describe('NoGames.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(NoGames);

    expect(wrapper.isVisible()).toBe(true);
  });
});
