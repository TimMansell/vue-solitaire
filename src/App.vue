<template>
  <div id="app">
    <div class="controls">
      <button @click="restartGame">
        Restart Game
      </button>
    </div>
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
  methods: {
    restartGame() {
      this.$store.dispatch('restartGame');
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background: green;
}

.controls {
  position: fixed;
  right: .5rem;
  top: .5rem;
}

.app-version {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  color: white;
}
</style>
