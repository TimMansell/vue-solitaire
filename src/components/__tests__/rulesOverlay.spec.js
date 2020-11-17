import { shallowMount } from '@vue/test-utils';
import RulesOverlay from '@/components/RulesOverlay.vue';

describe('RulesOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(RulesOverlay);

    expect(wrapper).toMatchSnapshot();
  });
});
