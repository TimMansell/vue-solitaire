import { shallowMount } from '@vue/test-utils';
import UserGames from '@/components/UserGames.vue';

describe('UserGames.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UserGames, {
      computed: {
        userGameCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
