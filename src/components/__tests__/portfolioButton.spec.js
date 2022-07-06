import { shallowMount } from '@vue/test-utils';
import PortfolioButton from '@/components/PortfolioButton.vue';

describe('PortfolioButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(PortfolioButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
