import { shallowMount } from '@vue/test-utils';
import GlobalGames from '@/components/GlobalGames.vue';

describe('GlobalGames.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GlobalGames, {
      computed: {
        globalGameCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
