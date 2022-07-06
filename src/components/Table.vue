<template>
  <table class="table" :class="tableClass">
    <thead>
      <tr data-test="table-header-row">
        <th
          class="table__cell"
          v-for="(heading, headingIndex) in headings"
          :key="headingIndex"
          data-test="table-header-cell"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody v-if="!rows.length">
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
    <tbody v-if="rows.length">
      <tr
        class="table__row"
        :class="{ 'table__row--highlighted': isHighlighted }"
        v-for="({ row, isHighlighted }, rowIndex) in rows"
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
import { findExistsInObject } from '@/helpers/find';

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
    spacing: {
      type: Boolean,
      default: false,
    },
    placeholderRows: {
      type: Number,
      default: 1,
    },
    toHighlight: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    tableClass() {
      const { spacing } = this;

      return {
        'table--spacing': spacing,
      };
    },
    rows() {
      const { items, toHighlight } = this;

      const formattedRows = items.map((cells) => ({
        row: cells,
        ...(toHighlight && {
          isHighlighted: findExistsInObject(
            cells,
            (cell) =>
              JSON.stringify(cell) ===
              JSON.stringify(Object.entries(toHighlight).at(0))
          ),
        }),
      }));

      return formattedRows;
    },
  },
};
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  background: var(--bg-primary-alt-2);

  &--spacing {
    margin-bottom: var(--mg-md);
  }

  &__row {
    background: transparent;

    &--highlighted {
      background: var(--bg-tertiary-alt);
    }
  }

  &__cell {
    border: 1px solid var(--bdr-secondary);
    padding: var(--pd-sm);
    white-space: nowrap;
    line-height: 1;
  }
}
</style>
