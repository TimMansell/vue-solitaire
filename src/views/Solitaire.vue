<template>
  <div class="solitaire">
    <Board />
  </div>
</template>

<script>
import Board from '@/components/Board.vue';
import emptyColumn from '../../tests/fixtures/boards/emptyColumn.json';

export default {
  name: 'Home',
  components: {
    Board,
  },
  mounted() {
    // this.$store.dispatch('initGame');
    this.$store.dispatch('setTestBoard', emptyColumn);
  },
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0;
}
</style>
