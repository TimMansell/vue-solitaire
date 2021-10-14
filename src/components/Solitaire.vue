<template>
  <div class="solitaire">
    <Board />
    <VersionAlert />
  </div>
</template>

<script>
import Board from '@/components/Board.vue';
import VersionAlert from '@/components/VersionAlert.vue';

export default {
  name: 'Home',
  components: {
    Board,
    VersionAlert,
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
