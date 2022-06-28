import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

describe('CardPlaceholder.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(CardPlaceholder);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      props: {
        seeThrough: true,
      },
    });

    expect(wrapper.props().seeThrough).toBe(true);
  });

  it('should render a see-through card', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      props: {
        seeThrough: true,
      },
    });

    expect(wrapper.classes()).toContain('card-placeholder');
  });

  it('should show 1 placeholder card', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      props: {
        seeThrough: true,
      },
    });

    expect(wrapper.findAll('[data-test="placeholder-card"]')).toHaveLength(1);
  });

  it('should show multiple column placeholder cards', () => {
    const wrapper = shallowMount(CardPlaceholder, {
      props: {
        cards: 5,
      },
    });

    expect(wrapper.findAll('[data-test="placeholder-card"]')).toHaveLength(5);
  });
});
