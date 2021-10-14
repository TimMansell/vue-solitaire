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
});
