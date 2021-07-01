import { shallowMount } from '@vue/test-utils';
import ShowBoardButton from '@/components/ShowBoardButton.vue';

describe('ShowBoardButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      computed: {
        isOverlayVisible: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should contain show board', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      computed: {
        isOverlayVisible: () => true,
      },
    });

    expect(wrapper.text()).toEqual('Show Board');
  });

  it('should contain hide board', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      computed: {
        isOverlayVisible: () => false,
      },
    });

    expect(wrapper.text()).toEqual('Hide Board');
  });
});
