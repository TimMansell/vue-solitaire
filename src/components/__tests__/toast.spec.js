import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';

describe('Toast.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Toast, {
      props: {
        id: 'toast',
        content: 'content',
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
