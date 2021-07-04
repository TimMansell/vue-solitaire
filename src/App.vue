<template>
  <div id="app">
    <Header />
    <Solitaire />
    <Footer />
  </div>
</template>

<script>
/* eslint vue-scoped-css/require-scoped: off */
import Header from '@/components/Header.vue';
import Solitaire from '@/components/Solitaire.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Solitaire,
    Footer,
  },
};
</script>

<style lang="scss">
@import '~sanitize.css';

html {
  font-family: var(--font-family-primary);
  font-size: var(--font-size);
}

body {
  background: var(--bg-primary);
}

:is(h1, h2, h3, h4, h5, h6) {
  margin-top: 0;
  margin-bottom: var(--mg-md);
  font-size: var(--font-size-lg);
  letter-spacing: -1px;
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
}
</style>
