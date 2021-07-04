<template>
  <div>
    Players:
    <Counter data-test="player-count" :number="playerCount" /> | Global Games:
    <Counter data-test="global-stats" :number="globalGameCount" />
  </div>
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
    ...mapGetters(['playerCount', 'globalGameCount']),
  },
};
</script>
