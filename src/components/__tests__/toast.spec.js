import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';

describe('Toast.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Toast, {
      propsData: {
        id: 'toast',
        content: 'content',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
