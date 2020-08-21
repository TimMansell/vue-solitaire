<template>
  <div>
    Global games: <span data-test="stats">{{ globalStats.count }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GlobalStats',
  computed: {
    ...mapGetters(['globalStats']),
  },
};
</script>
