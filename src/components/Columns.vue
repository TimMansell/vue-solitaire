<template>
  <div class="columns">
    <Column
      v-for="(column, index) in columnCards"
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
    ...mapGetters(['columnCards']),
  },
};
</script>

<style scoped lang="scss">
.columns {
  display: flex;
  margin-left: calc(var(--col-padding) * -1);
  margin-right: calc(var(--col-padding) * -1);

  @media (min-width: $bp-md) {
    margin-left: calc(var(--col-padding-lg) * -1);
    margin-right: calc(var(--col-padding-lg) * -1);
  }
}
</style>
