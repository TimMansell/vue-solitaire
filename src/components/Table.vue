<template>
  <table class="table">
    <thead>
      <tr>
        <th
          class="table__cell"
          v-for="(heading, headingIndex) in headings"
          :key="headingIndex"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!items.length">
      <tr
        v-for="(row, placeholderRowIndex) in placeholderRows"
        :key="placeholderRowIndex"
        data-test="table-placeholder-row"
      >
        <td
          class="table__cell"
          v-for="(cell, placeholderCellIndex) in headings"
          :key="placeholderCellIndex"
        >
          <SkeletonLoader />
        </td>
      </tr>
    </tbody>
    <tbody v-if="items.length">
      <tr
        v-for="(row, rowIndex) in items"
        :key="rowIndex"
        data-test="table-row"
      >
        <td
          class="table__cell"
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          data-test="table-cell"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import SkeletonLoader from '@/components/SkeletonLoader.vue';

export default {
  name: 'Table',
  components: {
    SkeletonLoader,
  },
  props: {
    headings: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    placeholderRows: {
      type: Number,
      default: 1,
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  background: rgba($col-primary, 0.3);
  margin-bottom: var(--mg-md);

  &__cell {
    border: 1px solid var(--bdr-secondary);
    padding: var(--pd-sm);
    white-space: nowrap;
    line-height: 1;
  }
}
</style>
