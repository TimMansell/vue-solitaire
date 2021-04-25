<template>
  <div>
    Players:
    <Counter data-test="player-count" :number="players" /> | Global Games:
    <Counter data-test="global-stats" :number="games" />
    <span v-if="isStatsEnabled"
      >(<ViewStatsButton
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
import { checkStatsFlag } from '@/helpers/stats';

export default {
  name: 'GlobalStats',
  components: {
    Counter,
    ViewStatsButton,
  },
  data() {
    return {
      isStatsEnabled: checkStatsFlag(),
    };
  },
  computed: {
    ...mapGetters(['globalStats']),
    games() {
      const {
        globalStats: { completed },
      } = this;

      return completed;
    },
    players() {
      const {
        globalStats: { players },
      } = this;

      return players;
    },
  },
  methods: {
    ...mapActions(['getGlobalStats']),
  },
};
</script>
