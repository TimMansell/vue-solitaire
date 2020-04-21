<template>
  <div id="app">
    <Controls />
    <Rules />
    <Solitaire />
    <div class="app-version">v{{ version }}</div>
  </div>
</template>

<script>
import Controls from '@/components/Controls.vue';
import Rules from '@/components/Rules.vue';
import Solitaire from '@/views/Solitaire.vue';
import { version } from '../package.json';

export default {
  name: 'App',
  components: {
    Controls,
    Rules,
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
