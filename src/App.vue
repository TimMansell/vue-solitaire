<template>
  <div id="app">
    <RouterView name="main" />
    <RouterView name="overlay" />
  </div>
</template>

<script>
/* eslint vue-scoped-css/require-scoped: off */
import { mapGetters, mapActions } from 'vuex';
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'isGamePaused',
      'hasGameWon',
      'hasGameLost',
      'hasGameUpdated',
      'isOldVersion',
      'hasConnectionError',
    ]),
  },
  created() {
    this.initApp();
  },
  mounted() {
    const events = {
      visibilitychange: ({ target }) =>
        setTimeout(this.checkGameFocused, 2000, target),
    };

    this.events = addEventListener(events);
  },
  unmounted() {
    const { events } = this;

    removeEventListener(events);
  },
  watch: {
    hasGameWon(hasGameWon) {
      if (!hasGameWon) return;

      this.goToRoute('won');
    },
    hasGameLost(hasGameLost) {
      if (!hasGameLost) return;

      this.goToRoute('lost');
    },
    isOldVersion(isOldVersion) {
      if (!isOldVersion) return;

      this.goToRoute('update');
    },
    hasGameUpdated(hasGameUpdated) {
      if (!hasGameUpdated) return;

      this.goToRoute('home');
    },
    hasConnectionError(hasConnectionError) {
      if (!hasConnectionError) {
        this.goToRoute('home');
        return;
      }

      this.goToRoute('connection-error');
    },
  },
  methods: {
    ...mapActions(['initApp', 'goToRoute']),
    checkGameFocused({ visibilityState }) {
      const { isGamePaused } = this;

      if (isGamePaused) return;

      if (visibilityState === 'hidden') {
        this.goToRoute('pause');
      }
    },
  },
};
</script>

<style lang="scss">
@import 'sanitize.css';

html {
  font-family: var(--font-family-primary);
  font-size: var(--font-size);
}

body {
  background: var(--bg-primary);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: var(--mg-md);
  font-size: var(--font-size-lg);
  letter-spacing: -1px;
  line-height: 1.25;
  color: var(--text-primary);
}

h1 {
  font-family: var(--font-family-secondary);
  font-size: var(--font-size-xl);
}

h2 {
  font-family: var(--font-family-secondary);
  font-weight: var(--font-weight-normal);
}

p {
  margin-top: 0;
  line-height: 1.65;
  color: var(--text-primary);
}

ul {
  margin: 0;
  padding-left: var(--pd-md);
  margin-bottom: var(--mg-md);
  color: var(--text-primary);

  @media (min-width: $bp-sm) {
    padding-left: var(--pd-lg);
  }
}

a {
  text-decoration: none;
  color: var(--text-primary);

  &:hover {
    text-decoration: underline;
  }
}
</style>
