<template>
  <div class="responsive-table">
    <div class="responsive-table__overlay" v-if="swiper">
      <img class="responsive-table__swipe" :src="swipeIcon" />
    </div>
    <Table :headings="headings" :items="items" />
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
  position: relative;
  max-width: calc(100vw - var(--vr));
  overflow-x: auto;
  margin-bottom: var(--mg-md);

  @media (min-width: $bp-sm) {
    max-width: initial;
  }

  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--col-secondary-alt);

    @media (min-width: $bp-sm) {
      display: none;
    }
  }

  &__swipe {
    position: relative;
    width: 3rem;
    height: 3rem;
    transform: translate(0%, 50%);
    animation: slide-left-right 1.5s ease-in-out alternate infinite;
  }
}

@keyframes slide-left-right {
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
</style>
