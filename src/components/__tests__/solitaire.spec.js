import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('shows stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => true,
      },
    });

    expect(wrapper.find('[data-test="stats-overlay"]').exists()).toBe(true);
  });

  it('does not shows stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
      },
    });

    expect(wrapper.find('[data-test="stats-overlay"]').exists()).toBe(false);
  });
});
