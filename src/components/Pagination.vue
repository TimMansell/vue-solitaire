<template>
  <Paginate
    :page-count="pages"
    :page-range="11"
    :margin-pages="2"
    :first-last-button="false"
    :click-handler="displayPage"
    :container-class="'pagination'"
    :page-class="'pagination__page'"
    :prev-class="'pagination__page pagination__page--outline'"
    :next-class="'pagination__page pagination__page--outline'"
    :active-class="'pagination__page--is-active'"
    :disabled-class="'pagination__page--is-disabled'"
    :break-view-class="'pagination__page--is-break'"
  />
</template>

<script>
import Paginate from 'vuejs-paginate';

export default {
  name: 'Pagination',
  components: {
    Paginate,
  },
  props: {
    pages: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 15,
    },
  },
  methods: {
    displayPage(page) {
      this.$emit('page', page);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--pd-xs);
  list-style-type: none;
  padding: 0;
  margin: 0;

  &__page {
    border-radius: var(--bdr-radius-sm);
    padding: var(--pd-sm);
    line-height: 1;

    &--outline {
      border: 1px solid var(--bdr-secondary);
    }

    &--is-active {
      background: var(--col-secondary-alt);
    }

    &--is-disabled {
      a {
        cursor: not-allowed;
      }
    }

    &--is-break {
      border: 0;
    }
  }
}
</style>
