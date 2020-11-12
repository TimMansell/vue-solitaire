import { shallowMount } from '@vue/test-utils';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('ViewStatsButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ViewStatsButton, {
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
