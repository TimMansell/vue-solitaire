<template>
  <div>
    Global Games: <span data-test="global-stats">{{ globalStats.count }}</span>
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
