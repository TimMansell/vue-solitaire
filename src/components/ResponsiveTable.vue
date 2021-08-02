<template>
  <div class="responsive-table">
    <div
      class="responsive-table__overlay"
      v-if="showTableHelper && items.length"
      data-test="responsive-table-helper"
    >
      <img class="responsive-table__swipe" :src="swipeIcon" />
    </div>
    <Table
      :headings="headings"
      :items="items"
      :placeholder-rows="placeholderRows"
    />
  </div>
</template>

<script>
import swipeIcon from '@/assets/swipe.svg';
import Table from '@/components/Table.vue';

export default {
  name: 'ResponsiveTable',
  components: {
    Table,
  },
  data() {
    return {
      swipeIcon,
      showTableHelper: !localStorage.getItem('showTableHelper'),
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
    placeholderRows: {
      type: Number,
      default: 1,
    },
  },
  destroyed() {
    localStorage.setItem('showTableHelper', 'false');
  },
};
</script>

<style scoped lang="scss">
.responsive-table {
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
    background: var(--bg-tertiary-alt);
    opacity: 0;
    animation: overlay-hide 3s ease-in-out normal 1 forwards;

    @media (min-width: $bp-sm) {
      display: none;
    }
  }

  &__swipe {
    position: relative;
    width: 3rem;
    height: 3rem;
    transform: translate(0%, 50%);
    animation: swipe-left-right 1s ease-in-out alternate infinite;
  }
}

@keyframes swipe-left-right {
  0% {
    transform: translate(0%, 50%);
  }

  10% {
    transform: translate(0%, 50%);
  }

  90% {
    transform: translate(100%, 50%);
  }

  100% {
    transform: translate(100%, 50%);
  }
}

@keyframes overlay-hide {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
