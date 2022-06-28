import { shallowMount } from '@vue/test-utils';
import HistoryButton from '@/components/HistoryButton.vue';

describe('HistoryButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(HistoryButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
