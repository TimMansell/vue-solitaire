<template>
  <div class="columns">
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :column-no="index"
      :cards="column" />
  </div>
</template>

<script>
import Column from '@/components/Column.vue';

export default {
  name: 'Columns',
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
.columns {
  width: 100%;
  display: flex;
}
</style>
