<template>
  <div id="app">
    <router-view />
    <div class="app-version">
      v{{ version }}
    </div>
  </div>
</template>

<script>
import { version } from '../package.json';

export default {
  name: 'App',
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
