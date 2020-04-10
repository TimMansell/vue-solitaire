<template>
  <div class="board">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :cards="column" />
  </div>
</template>

<script>
import Column from '@/components/Column.vue';

export default {
  name: 'Board',
  components: {
    Column,
  },
  data() {
    return {
      columns: this.$store.getters.boardCards,
    };
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: green;
}
</style>
