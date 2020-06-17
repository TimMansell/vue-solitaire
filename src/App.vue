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
* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
  background: #027002;

  @media (min-width: $bp-md) {
    background: #027002 url('./assets/felt.png') repeat;
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
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;

  @media (min-width: $bp-sm) {
    padding-left: 2rem;
  }
}
</style>
