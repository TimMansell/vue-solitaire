import { shallowMount } from '@vue/test-utils';
import ShowRulesButton from '@/components/ShowRulesButton.vue';

describe('ShowRulesButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ShowRulesButton, {
      computed: {
        isGamePaused: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
