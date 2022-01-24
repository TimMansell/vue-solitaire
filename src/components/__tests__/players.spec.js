import { shallowMount } from '@vue/test-utils';
import Players from '@/components/Players.vue';

describe('Players.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Players, {
      computed: {
        playerCount: () => 1,
        onlinePlayerCount: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 1 player online in title', () => {
    const wrapper = shallowMount(Players, {
      computed: {
        playerCount: () => 1,
        onlinePlayerCount: () => 1,
      },
    });

    expect(
      wrapper.find('[data-test="online-title"]').attributes().title
    ).toContain('1 player online');
  });

  it('should show 2 players online in title', () => {
    const wrapper = shallowMount(Players, {
      computed: {
        playerCount: () => 1,
        onlinePlayerCount: () => 2,
      },
    });

    expect(
      wrapper.find('[data-test="online-title"]').attributes().title
    ).toContain('2 players online');
  });
});
