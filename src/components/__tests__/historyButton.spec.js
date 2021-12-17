import { shallowMount } from '@vue/test-utils';
import HistoryButton from '@/components/HistoryButton.vue';

describe('HistoryButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(HistoryButton, {
      computed: {
        isEmptyBoard: () => false,
        isOnline: () => true,
        isGamePaused: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
