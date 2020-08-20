import { shallowMount } from '@vue/test-utils';
import NewGame from '@/components/NewGame.vue';

describe('NewGame.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(NewGame, {
      computed: {
        game: () => ({
          id: 1,
        }),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
