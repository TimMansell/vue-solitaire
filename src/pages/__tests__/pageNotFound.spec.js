import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PageNotFound from '@/pages/PageNotFound.vue';

describe('PageNotFound.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(PageNotFound);

    expect(wrapper.isVisible()).toBe(true);
  });
});
