<template>
  <div class="columns">
    <Column v-for="(column, index) in boardCards" :key="index" :column-no="index" :cards="column" />
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
  display: flex;
}
</style>
