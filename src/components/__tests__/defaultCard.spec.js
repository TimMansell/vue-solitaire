import { shallowMount } from '@vue/test-utils';
import DefaultCard from '@/components/DefaultCard.vue';

describe('DefaultCard.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(DefaultCard);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      value: 'J',
      suit: '♣',
    };

    const wrapper = shallowMount(DefaultCard, {
      propsData,
    });

    expect(wrapper.props().value).toBe(propsData.value);
    expect(wrapper.props().suit).toBe(propsData.suit);
  });
});
