import { shallowMount } from '@vue/test-utils';
import HistoryButton from '@/components/HistoryButton.vue';

describe('HistoryButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(HistoryButton, {
      computed: {
        hasCards: () => true,
        isOnline: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
