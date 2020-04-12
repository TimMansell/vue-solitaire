<template>
  <div class="board">
    <Aces />
    <Columns />
  </div>
</template>

<script>
import Aces from '@/components/Aces.vue';
import Columns from '@/components/Columns.vue';

export default {
  name: 'Board',
  components: {
    Aces,
    Columns,
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  padding: 1rem;
  max-width: 960px;
}
</style>
