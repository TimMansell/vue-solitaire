<template>
  <div class="responsive-table">
    <div class="responsive-table__overlay" v-if="showTableHelper">
      <img class="responsive-table__swipe" :src="swipeIcon" />
    </div>
    <Table :headings="headings" :items="items" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
  computed: {
    ...mapGetters(['showTableHelper']),
  },
  mounted() {
    const { showTableHelper } = this;

    if (showTableHelper) {
      setTimeout(this.setTableHelper, 5000, false);
    }
  },
  methods: {
    ...mapActions(['setTableHelper']),
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
    opacity: 0;
    animation: overlay-hide 3s ease-in-out normal 1s 1 forwards;

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