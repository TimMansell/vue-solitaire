import { shallowMount } from '@vue/test-utils';
import ContinueGameButton from '@/components/ContinueGameButton.vue';

describe('ContinueGameButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ContinueGameButton);

    expect(wrapper).toMatchSnapshot();
  });
});
