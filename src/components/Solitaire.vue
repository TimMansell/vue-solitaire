<template>
  <div class="solitaire">
    <Board />
    <CheckVersion />
  </div>
</template>

<script>
import Board from '@/components/Board.vue';
import CheckVersion from '@/components/CheckVersion.vue';

export default {
  name: 'Home',
  components: {
    Board,
    CheckVersion,
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
