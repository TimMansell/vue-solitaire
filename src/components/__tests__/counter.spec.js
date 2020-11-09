import { shallowMount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Counter);

    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly format 1000 as 1,000', () => {
    const wrapper = shallowMount(Counter, {
      propsData: {
        number: 1000,
      },
    });

    expect(wrapper.find('[data-test="counter"]').text()).toContain('1,000');
  });

  it('should correctly format 1000000 as 1,000,000', () => {
    const wrapper = shallowMount(Counter, {
      propsData: {
        number: 1000000,
      },
    });

    expect(wrapper.find('[data-test="counter"]').text()).toContain('1,000,000');
  });
});
