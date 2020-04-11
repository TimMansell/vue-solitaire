<template>
  <div class="home">
    <Board />
  </div>
</template>

<script>
import Board from '@/components/Board.vue';

export default {
  name: 'Home',
  components: {
    Board,
  },
  mounted() {
    this.$store.dispatch('initGame');
  },
};
</script>
