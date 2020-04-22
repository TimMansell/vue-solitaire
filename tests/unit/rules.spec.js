import { shallowMount } from '@vue/test-utils';
import Rules from '@/components/Rules.vue';

describe('Rules.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Rules);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls toggleRules when clicked', () => {
    const wrapper = shallowMount(Rules);
    const mockFunction = jest.fn();

    wrapper.setMethods({ toggleRules: mockFunction });

    wrapper.find('[data-test="game-rules"]').trigger('click');

    expect(mockFunction).toHaveBeenCalled();
  });
});
