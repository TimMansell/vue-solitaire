import { shallowMount } from '@vue/test-utils';
import UpdateButton from '@/components/UpdateButton.vue';

describe('UpdateButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(UpdateButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
