import { shallowMount } from '@vue/test-utils';
import NewGameButton from '@/components/NewGameButton.vue';

describe('NewGameButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(NewGameButton, {
      computed: {
        isGameLoading: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
