<template>
  <div>
    Global Games:
    <span data-test="global-stats"
      ><Counter data-test="global-stats" :number="number" /> (<ViewStatsButton
        :load-stats="getGlobalStats"
        data-test="global-stats-btn"
      />)</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
        globalStats: { completed },
      } = this;

      return completed;
    },
  },
  methods: {
    ...mapActions(['getGlobalStats']),
  },
};
</script>
