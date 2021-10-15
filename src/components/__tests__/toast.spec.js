import { shallowMount } from '@vue/test-utils';
import Toast from '@/components/Toast.vue';

const propsData = {
  title: 'test title',
  msgs: ['line 1', 'line 2', 'line 3'],
  btnText: 'btn text',
};

describe('Toast.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Toast, {
      propsData,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should render in primary position', () => {
    const wrapper = shallowMount(Toast, {
      propsData: {
        ...propsData,
      },
    });

    expect(wrapper.find('[data-test="toast"]').classes()).toContain(
      'toast--primary'
    );
  });

  it('should render in bottom/center position', () => {
    const wrapper = shallowMount(Toast, {
      propsData: {
        ...propsData,
        position: 'secondary',
      },
    });

    expect(wrapper.find('[data-test="toast"]').classes()).toContain(
      'toast--secondary'
    );
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
