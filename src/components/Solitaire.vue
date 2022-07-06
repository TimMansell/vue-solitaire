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
};
</script>

<style scoped lang="scss">
.solitaire {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
