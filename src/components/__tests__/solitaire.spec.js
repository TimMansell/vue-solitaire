import { shallowMount } from '@vue/test-utils';
import Solitaire from '@/components/Solitaire.vue';
import RulesOverlay from '@/components/RulesOverlay.vue';
import StatsOverlay from '@/components/StatsOverlay.vue';
import NewGameOverlay from '@/components/NewGameOverlay.vue';
import HistoryOverlay from '@/components/HistoryOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

jest.mock('@/services/db');

const mockComputed = {
  showStats: () => false,
  showRules: () => false,
  showNewGame: () => false,
  showHistory: () => false,
  showLeaderboards: () => false,
};

describe('Solitaire.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        showStats: () => true,
        showRules: () => true,
        showNewGame: () => true,
        showHistory: () => true,
        showLeaderboards: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('shows stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
        showStats: () => true,
      },
    });

    expect(wrapper.findComponent(StatsOverlay).exists()).toBe(true);
  });

  it('does not show stats overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.findComponent(StatsOverlay).exists()).toBe(false);
  });

  it('shows rules overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
        showRules: () => true,
      },
    });

    expect(wrapper.findComponent(RulesOverlay).exists()).toBe(true);
  });

  it('does not show rules overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.findComponent(RulesOverlay).exists()).toBe(false);
  });

  it('shows new game overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
        showNewGame: () => true,
      },
    });

    expect(wrapper.findComponent(NewGameOverlay).exists()).toBe(true);
  });

  it('does not show new game overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.findComponent(NewGameOverlay).exists()).toBe(false);
  });

  it('shows history overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
        showHistory: () => true,
      },
    });

    expect(wrapper.findComponent(HistoryOverlay).exists()).toBe(true);
  });

  it('does not show history overlay', () => {
    const wrapper = shallowMount(Solitaire, {
      mocks,
      computed: {
        ...mockComputed,
      },
    });

    expect(wrapper.findComponent(HistoryOverlay).exists()).toBe(false);
  });
});
