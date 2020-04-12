<template>
  <div id="app">
    <Solitaire />
  </div>
</template>

<script>
import Solitaire from '@/views/Solitaire.vue';

export default {
  name: 'App',
  components: {
    Solitaire,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  background: green;
}
</style>
