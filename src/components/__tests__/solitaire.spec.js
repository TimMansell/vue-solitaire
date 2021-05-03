import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';
import NewGameOverlay from '@/components/NewGameOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

jest.mock('@/services/db');

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => true,
        showRules: () => true,
        showNewGame: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('shows stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => true,
        showRules: () => false,
        showNewGame: () => false,
      },
    });

    expect(wrapper.findComponent(StatsOverlay).exists()).toBe(true);
  });

  it('does not show stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
        showRules: () => false,
        showNewGame: () => false,
      },
    });

    expect(wrapper.findComponent(StatsOverlay).exists()).toBe(false);
  });

  it('shows rules overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
        showRules: () => true,
        showNewGame: () => false,
      },
    });

    expect(wrapper.findComponent(RulesOverlay).exists()).toBe(true);
  });

  it('does not show rules overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
        showRules: () => false,
        showNewGame: () => false,
      },
    });

    expect(wrapper.findComponent(RulesOverlay).exists()).toBe(false);
  });

  it('shows new game overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
        showRules: () => false,
        showNewGame: () => true,
      },
    });

    expect(wrapper.findComponent(NewGameOverlay).exists()).toBe(true);
  });

  it('does not show new game overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => false,
        showRules: () => false,
        showNewGame: () => false,
      },
    });

    expect(wrapper.findComponent(NewGameOverlay).exists()).toBe(false);
  });
});
