import { shallowMount } from '@vue/test-utils';
import TouchEvents from '@/components/TouchEvents.vue';

describe('TouchEvents.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(TouchEvents);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls swipe method', () => {
    const wrapper = shallowMount(TouchEvents);

    wrapper.vm.swipe();

    expect(wrapper.emitted().swipe).toBeTruthy();
  });

  it('calls doubleTap method', () => {
    const wrapper = shallowMount(TouchEvents);

    wrapper.vm.doubleTap();

    expect(wrapper.emitted().doubletap).toBeTruthy();
  });
});
