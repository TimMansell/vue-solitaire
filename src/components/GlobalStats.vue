<template>
  <div>
    Global Games:
   <Counter data-test="global-stats" :number="number" /> (<ViewStatsButton />)</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'GlobalStats',
  components: {
    Counter,
    ViewStatsButton,
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
