<template>
  <div class="responsive-table">
    <div class="responsive-table__overlay" v-if="swiper">
      <img class="responsive-table__swipe" :src="swipeIcon" />
    </div>
    <Table
      :headings="['#', 'Date', 'Time', 'Outcome', 'Moves', 'Duration']"
      :items="items"
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
.responsive-table {
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
