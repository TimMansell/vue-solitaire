import { shallowMount } from '@vue/test-utils';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

describe('ViewStatsButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ViewStatsButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
