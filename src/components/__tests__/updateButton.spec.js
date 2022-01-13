import { shallowMount } from '@vue/test-utils';
import UpdateButton from '@/components/UpdateButton.vue';

describe('UpdateButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UpdateButton);

    expect(wrapper).toMatchSnapshot();
  });
});
