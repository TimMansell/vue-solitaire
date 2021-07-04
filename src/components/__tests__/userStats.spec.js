import { shallowMount } from '@vue/test-utils';
import UserStats from '@/components/UserStats.vue';

describe('UserStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UserStats, {
      computed: {
        userGameCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
