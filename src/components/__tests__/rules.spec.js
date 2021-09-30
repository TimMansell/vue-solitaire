import { shallowMount } from '@vue/test-utils';
import Rules from '@/components/Rules.vue';

describe('Rules.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper).toMatchSnapshot();
  });

  it('should show correct amount of move options', () => {
    const wrapper = shallowMount(Rules);
    const list = wrapper
      .find('[data-test="rules-overlay-move-list"]')
      .findAll('li');

    expect(list).toHaveLength(3);
  });
});
