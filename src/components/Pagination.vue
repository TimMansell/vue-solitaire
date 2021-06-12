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

const matchMedia = (media) =>
  window.matchMedia(`(min-width: ${media}px)`).matches;

export default {
  name: 'Pagination',
  components: {
    Paginate,
  },
  props: {
    pages: {
      type: Number,
      default: 1,
    },
    startOn: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      range: 3,
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
      const xs = matchMedia(360);
      const sm = matchMedia(480);
      const xl = matchMedia(1366);

      if (xl) {
        return 9;
      }

      if (sm) {
        return 7;
      }

      if (xs) {
        return 5;
      }

      return 3;
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
  padding: 0;
  margin: 0;

  &__page {
    display: flex;
    border: 1px solid transparent;
    border-radius: var(--bdr-radius-sm);
    line-height: 1;
    margin-left: var(--mg-xxs);
    margin-right: var(--mg-xxs);

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

    a {
      padding: var(--pd-xs);
    }
  }
}
</style>
