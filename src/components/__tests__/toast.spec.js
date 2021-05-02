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

  it('should not render a header', () => {
    const { msgs, btnText } = propsData;

    const wrapper = shallowMount(Toast, {
      propsData: { msgs, btnText },
    });

    const header = wrapper.find('[data-test="toast-header"]');

    expect(header.exists()).toBe(false);
  });
});
