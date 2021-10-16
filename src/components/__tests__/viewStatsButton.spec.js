import { shallowMount } from '@vue/test-utils';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

describe('ViewStatsButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ViewStatsButton, {
      computed: {
        emptyBoard: () => false,
        isOnline: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
