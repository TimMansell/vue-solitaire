<template>
  <div id="app">
    <Controls />
    <Solitaire />
    <div class="app-version">v{{ version }}</div>
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Solitaire from '@/views/Solitaire.vue';
import { version } from '../package.json';

export default {
  name: 'App',
  components: {
    Controls,
    Solitaire,
  },
  data() {
    return {
      version,
    };
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
  background: green;
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

.app-version {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: white;
}
</style>
