<template>
  <div>
    Global Games:
    <span data-test="global-stats">{{ globalStats.count }} (<ViewStatsButton />)</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'GlobalStats',
  components: {
    ViewStatsButton,
  },
  computed: {
    ...mapGetters(['globalStats']),
  },
};
</script>
