import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import { setupStore } from '@@/tests/helpers';

describe('App.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(App, {
      global: {
        mocks: {
          $store: setupStore({
            dispatch: vi.fn(),
            isGamePaused: false,
            hasGameWon: false,
            hasGameLost: false,
            hasGameUpdated: false,
            isOldVersion: false,
            hasConnectionError: false,
          }),
        },
        stubs: ['RouterView'],
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
