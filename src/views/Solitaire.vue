<template>
  <div class="solitaire">
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

<style scoped lang="scss">
.solitaire {
  margin-top: 1.5rem;
}
</style>
