import { shallowMount } from '@vue/test-utils';
import RulesOverlay from '@/components/RulesOverlay.vue';

describe('RulesOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(RulesOverlay);

    expect(wrapper).toMatchSnapshot();
  });

  it('should show correct amount of move options', () => {
    const wrapper = shallowMount(RulesOverlay);
    const list = wrapper
      .find('[data-test="rules-overlay-move-list"]')
      .findAll('li');

    expect(list).toHaveLength(3);
  });
});
