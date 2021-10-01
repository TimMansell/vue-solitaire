import { shallowMount } from '@vue/test-utils';
import ResumeGameButton from '@/components/ResumeGameButton.vue';

describe('ResumeGameButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ResumeGameButton);

    expect(wrapper).toMatchSnapshot();
  });
});
