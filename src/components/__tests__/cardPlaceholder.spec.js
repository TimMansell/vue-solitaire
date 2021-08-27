import { shallowMount } from '@vue/test-utils';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

describe('CardPlaceholder.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(CardPlaceholder);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      propsData: {
        seeThrough: true,
      },
    });

    expect(wrapper.props().seeThrough).toBe(true);
  });

  it('should render a see-through card', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      propsData: {
        seeThrough: true,
      },
    });

    expect(wrapper.classes()).toContain('card-placeholder');
  });

  it('should show 1 placeholder card', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      propsData: {
        seeThrough: true,
      },
    });

    expect(wrapper.findAll('[data-test="card-placeholder"]')).toHaveLength(1);
  });

  it('should show multiple column placeholder cards', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      propsData: {
        cards: 5,
      },
    });

    expect(wrapper.findAll('[data-test="card-placeholder"]')).toHaveLength(5);
  });
});
