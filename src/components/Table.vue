<template>
  <div>
    <p class="view-more">
      Swipe table to see more info
    </p>
    <div class="table-responsive">
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
    </div>
  </div>
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
.view-more {
  @media (min-width: $bp-sm) {
    display: none;
  }
}

.table {
  width: 100%;
  margin-bottom: var(--mg-md);

  &__cell {
    border: 1px solid var(--bdr-secondary);
    padding: var(--pd-sm);
    white-space: nowrap;
  }

  &-responsive {
    display: block;
    max-width: 90vw;
    overflow-x: auto;

    @media (min-width: $bp-sm) {
      max-width: initial;
    }
  }
}
</style>
