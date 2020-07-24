import { shallowMount } from '@vue/test-utils';
import DefaultCard from '@/components/DefaultCard.vue';

describe('DefaultCard.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(DefaultCard);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(DefaultCard, {
      propsData: {
        value: 'J',
        suit: 'c',
      },
    });

    expect(wrapper.props().value).toBe('J');
    expect(wrapper.props().suit).toBe('c');
  });
});
