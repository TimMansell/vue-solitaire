<template>
  <Paginate
    :page-count="pages"
    :page-range="range"
    :force-page="startOn"
    :margin-pages="0"
    :prev-text="'<'"
    :next-text="'>'"
    :first-last-button="true"
    :click-handler="displayPage"
    :container-class="'pagination'"
    :page-class="'pagination__page'"
    :prev-class="'pagination__page'"
    :next-class="'pagination__page'"
    :active-class="'pagination__page--is-active'"
    :disabled-class="'pagination__page--is-disabled'"
    :break-view-class="'pagination__page--is-break'"
    data-test="pagination"
  />
</template>

<script>
import Paginate from 'vuejs-paginate';
import {
  addEventListener,
  removeEventListener,
} from '@/helpers/eventListeners';
import { debounce } from 'throttle-debounce';

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
    startOn: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      range: 1,
    };
  },
  mounted() {
    const events = {
      resize: debounce(300, false, this.setRange),
    };

    this.events = addEventListener(events);

    this.setRange();
  },
  destroyed() {
    const { events } = this;

    removeEventListener(events);
  },
  methods: {
    getRange() {
      const xs = window.matchMedia('(min-width: 360px)').matches;
      const sm = window.matchMedia('(min-width: 480px)').matches;
      const xl = window.matchMedia('(min-width: 1366px)').matches;

      if (xl) {
        return 9;
      }

      if (sm) {
        return 7;
      }

      if (xs) {
        return 3;
      }

      return 1;
    },
    setRange() {
      this.range = this.getRange();
    },
    displayPage(page) {
      this.$emit('changepage', page);
    },
  },
};
</script>

<style lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  padding-left: var(--pd-sm);
  padding-right: var(--pd-sm);
  margin: 0;

  &__page {
    border: 1px solid transparent;
    border-radius: var(--bdr-radius-sm);
    padding: var(--pd-sm);
    line-height: 1;

    &:hover {
      border: 1px solid var(--bdr-secondary);
    }

    &--is-active {
      background: var(--col-secondary-alt);
    }

    &--is-disabled {
      opacity: 0.5;

      &:hover {
        border: 1px solid transparent;
      }

      /* stylelint-disable max-nesting-depth */
      a {
        cursor: not-allowed;
      }
      /* stylelint-enable max-nesting-depth */
    }

    &--is-break {
      display: none;
    }
  }
}
</style>
