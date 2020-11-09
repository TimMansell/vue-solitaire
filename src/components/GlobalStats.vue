<template>
  <div>Global Games: <Counter data-test="global-stats" :number="number" /></div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  name: 'GlobalStats',
  components: {
    Counter,
  },
  computed: {
    ...mapGetters(['globalStats']),
    number() {
      const {
        globalStats: { count },
      } = this;

      return count;
    },
  },
};
</script>
