<template>
  <div>
    Players:
    <Counter data-test="player-count" :number="players" /> | Global Games:
    <Counter data-test="global-stats" :number="games" /> (<ViewStatsButton
      :load-stats="getGlobalStats"
      data-test="global-stats-btn"
    />)
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
