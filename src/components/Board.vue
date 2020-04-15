<template>
  <div
    class="board"
    data-test="board">
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
  padding: $padding;
  margin: 0 auto;
  max-width: 320px;

  @media (min-width: $bp-desktop) {
    max-width: 760px;
  }
}
</style>
