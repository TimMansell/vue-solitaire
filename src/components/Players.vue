<template>
  <div>
    Games:
    <Counter data-test="player-count" :number="playerCount" />
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
    ...mapGetters(['playerCount']),
  },
};
</script>
