import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('App.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(App, {
      mocks: {
        $store: { dispatch: jest.fn() },
      },
      computed: {
        isGamePaused: () => false,
        gameOutcome: () => {},
      },
      stubs: ['RouterView'],
    });

    expect(wrapper).toMatchSnapshot();
  });
});
