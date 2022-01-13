import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';

const propsData = {
  msgs: ['line 1', 'line 2', 'line 3'],
  btnText: 'btn text',
  show: true,
};

describe('Toast.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Toast, {
      propsData,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should not show button', () => {
    const wrapper = shallowMount(Toast, {
      propsData: {
        ...propsData,
        btnText: '',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
