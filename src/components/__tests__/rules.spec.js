import { shallowMount } from '@vue/test-utils';
import Rules from '@/components/Rules.vue';

describe('Rules.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should show correct amount of move options', () => {
    const wrapper = shallowMount(Rules);
    const list = wrapper
      .find('[data-test="rules-overlay-move-list"]')
      .findAll('li');

    expect(list).toHaveLength(3);
  });
});
