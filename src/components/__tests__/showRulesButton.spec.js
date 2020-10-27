import { shallowMount } from '@vue/test-utils';
import ShowRulesButton from '@/components/ShowRulesButton.vue';

describe('ShowRulesButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ShowRulesButton);

    expect(wrapper).toMatchSnapshot();
  });
});
