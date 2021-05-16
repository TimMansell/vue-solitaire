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
    <tbody>
      <tr v-for="(row, rowIndex) in items" :key="rowIndex">
        <td
          class="table__cell"
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
        >
          {{ cell }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    headings: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  &__cell {
    border: 1px solid var(--bdr-primary);
    padding: var(--pd-sm);
  }
}
</style>
