<template>
  <div class="columns" data-test="columns">
    <Column
      v-for="(column, index) in boardCards"
      :key="index"
      :column-no="index"
      :cards="column"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Column from '@/components/Column.vue';

export default {
  name: 'Columns',
  components: {
    Column,
  },
  computed: {
    ...mapGetters(['boardCards']),
  },
};
</script>

<style scoped lang="scss">
.columns {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-flow: column;
  padding-left: var(--pd-xs);
  padding-right: var(--pd-xs);

  @media (min-width: $bp-lg) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
