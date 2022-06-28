import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ShowRulesButton from '@/components/ShowRulesButton.vue';

describe('ShowRulesButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ShowRulesButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
