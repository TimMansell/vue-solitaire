import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DefaultCard from '@/components/DefaultCard.vue';

describe('DefaultCard.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(DefaultCard);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const props = {
      value: 'J♣',
    };

    const wrapper = shallowMount(DefaultCard, {
      props,
    });

    expect(wrapper.props().value).toBe(props.value);
  });
});
