import { shallowMount } from '@vue/test-utils';
import PortfolioButton from '@/components/PortfolioButton.vue';

describe('PortfolioButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(PortfolioButton);

    expect(wrapper).toMatchSnapshot();
  });
});
