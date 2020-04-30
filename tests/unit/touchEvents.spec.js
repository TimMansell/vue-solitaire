import { shallowMount } from '@vue/test-utils';
import TouchEvents from '@/components/TouchEvents.vue';

describe('TouchEvents.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(TouchEvents);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(TouchEvents, {
      propsData: {
        disabled: false,
      },
    });

    expect(wrapper.props().disabled).toBe(false);
  });

  it('should call swipe method', () => {
    const wrapper = shallowMount(TouchEvents, {
      propsData: {
        disabled: false,
      },
    });

    wrapper.vm.swipe();

    expect(wrapper.emitted().swipe).toBeTruthy();
  });

  it('should call doubleTap method', () => {
    const wrapper = shallowMount(TouchEvents, {
      propsData: {
        disabled: false,
      },
    });

    wrapper.vm.doubleTap();

    expect(wrapper.emitted().doubletap).toBeTruthy();
  });

  it('should not call swipe method', () => {
    const wrapper = shallowMount(TouchEvents);

    wrapper.vm.swipe();

    expect(wrapper.emitted().swipe).toBeFalsy();
  });

  it('should not call doubleTap method', () => {
    const wrapper = shallowMount(TouchEvents);

    wrapper.vm.doubleTap();

    expect(wrapper.emitted().doubletap).toBeFalsy();
  });
});
