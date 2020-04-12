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
  padding: .5rem;
  margin: 0 auto;
  max-width: 960px;

  @media (min-width: 900px) {
    padding: 1rem;
  }
}
</style>
