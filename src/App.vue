<template>
  <div id="app">
    <Solitaire />
    <div class="app-version">
      v{{ version }}
    </div>
  </div>
</template>

<script>
import Solitaire from '@/views/Solitaire.vue';
import { version } from '../package.json';


export default {
  name: 'App',
  components: {
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
body {
  margin: 0;
  background: green;
}

.app-version {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: white;
}
</style>
