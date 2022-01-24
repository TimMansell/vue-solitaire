<template>
  <div>
    Players:
    <Counter data-test="player-count" :number="playerCount" />
    (<span :title="playersOnline" data-test="online-title">
      <Counter data-test="online-count" :number="onlinePlayerCount" /> </span
    >)
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Counter from '@/components/Counter.vue';

export default {
  name: 'Players',
  components: {
    Counter,
  },
  computed: {
    ...mapGetters(['playerCount', 'onlinePlayerCount']),
    playersOnline() {
      const { onlinePlayerCount } = this;

      const player = onlinePlayerCount > 1 ? 'players' : 'player';

      return `${onlinePlayerCount} ${player} online`;
    },
  },
};
</script>
