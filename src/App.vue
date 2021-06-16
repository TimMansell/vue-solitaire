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
  font-family: var(--font-family);
}

body {
  background: var(--bg-primary);

  @media (min-width: $bp-md) {
    background: var(--bg-primary) url('~@/assets/felt.png') repeat;
  }
}

:is(h1, h2, h3, h4, h5, h6, p) {
  margin-top: 0;
  margin-bottom: var(--mg-md);
}

ul {
  margin: 0;
  padding-left: var(--pd-md);
  margin-bottom: var(--mg-md);

  @media (min-width: $bp-sm) {
    padding-left: var(--pd-lg);
  }
}

a {
  text-decoration: none;
}
</style>
