import { shallowMount, config } from '@vue/test-utils';
import ShowHideBoardButton from '@/components/ShowHideBoardButton.vue';

config.renderStubDefaultSlot = true;

describe('ShowHideBoardButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ShowHideBoardButton);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should contain show board', () => {
    const wrapper = shallowMount(ShowHideBoardButton);

    expect(wrapper.text()).toEqual('Show Board');
  });

  it('should contain hide board', () => {
    const wrapper = shallowMount(ShowHideBoardButton, {
      props: {
        isShow: false,
      },
    });

    expect(wrapper.text()).toEqual('Hide Board');
  });
});
