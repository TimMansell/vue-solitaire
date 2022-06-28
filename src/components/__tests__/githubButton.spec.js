import { shallowMount } from '@vue/test-utils';
import GithubButton from '@/components/GithubButton.vue';

describe('GithubButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GithubButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
