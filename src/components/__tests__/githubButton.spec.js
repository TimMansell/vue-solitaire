import { shallowMount } from '@vue/test-utils';
import GithubButton from '@/components/GithubButton.vue';

describe('GithubButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GithubButton);

    expect(wrapper).toMatchSnapshot();
  });
});
