<template>
  <div id="app">
    <Controls />
    <Solitaire />
    <Footer />
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Solitaire from '@/views/Solitaire.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Controls,
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
    background: var(--bg-primary) url('./assets/felt.png') repeat;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin-top: 0;
  margin-bottom: var(--mg-md);
}

ul {
  padding-left: var(--pd-md);

  @media (min-width: $bp-sm) {
    padding-left: var(--pd-lg);
  }
}
</style>
