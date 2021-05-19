<template>
  <div>
    <div class="table-responsive">
      <div class="table-responsive__overlay" v-if="swiper">
        <img class="table-responsive__swipe" :src="swipeIcon" />
      </div>
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
import swipeIcon from '@/assets/swipe.svg';

export default {
  name: 'Table',
  data() {
    return {
      swipeIcon,
      swiper: true,
    };
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
  },
  mounted() {
    setTimeout(this.hideSwiper, 3000);
  },
  methods: {
    hideSwiper() {
      this.swiper = false;
    },
  },
};
</script>

<style scoped lang="scss">
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
    position: relative;
    max-width: calc(100vw - var(--vr));
    overflow-x: auto;

    @media (min-width: $bp-sm) {
      max-width: initial;
    }

    &__overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba($col-tertiary, 0.5);

      @media (min-width: $bp-sm) {
        display: none;
      }
    }

    &__swipe {
      width: 50px;
      height: 50px;
      transform: translate(0%, 100%);
      animation: slide-left-right 1.5s ease-in-out alternate infinite;
    }
  }
}

@keyframes slide-left-right {
  0% {
    transform: translate(0%, 100%);
  }

  10% {
    transform: translate(0%, 100%);
  }

  90% {
    transform: translate(100%, 100%);
  }

  100% {
    transform: translate(100%, 100%);
  }
}
</style>
