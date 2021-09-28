<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<script>
/* eslint vue-scoped-css/require-scoped: off */
import { mapActions } from 'vuex';

export default {
  name: 'App',
  async created() {
    this.initApp();
  },
  methods: {
    ...mapActions(['initApp']),
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
