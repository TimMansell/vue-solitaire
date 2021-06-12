<template>
  <table class="table">
    <thead>
      <tr>
        <th
          class="table__cell"
          v-for="(heading, index) in headings"
          :key="index"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!items.length">
      <tr
        v-for="(row, rowIndex) in placeholderRows"
        :key="rowIndex"
        data-test="table-row"
      >
        <td
          class="table__cell"
          v-for="(cell, cellIndex) in headings"
          :key="cellIndex"
        >
          <Progress />
        </td>
      </tr>
    </tbody>
    <tbody v-if="items.length">
      <tr
        v-for="(row, rowIndex2) in items"
        :key="rowIndex2"
        data-test="table-row"
      >
        <td
          class="table__cell"
          v-for="(cell, cellIndex2) in row"
          :key="cellIndex2"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Progress from '@/components/Progress.vue';

export default {
  name: 'Table',
  components: {
    Progress,
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

  &__cell {
    border: 1px solid var(--bdr-secondary);
    padding: var(--pd-sm);
    white-space: nowrap;
    line-height: 1;
  }
}
</style>
