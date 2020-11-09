<template>
  <div>
    Global Games:
    <span data-test="global-stats"
      >{{ globalStats.count }} (<ViewStatsButton :load-stats="getGlobalStats" />)</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ViewStatsButton from '@/components/ViewStatsButton.vue';

export default {
  name: 'GlobalStats',
  components: {
    ViewStatsButton,
  },
  computed: {
    ...mapGetters(['globalStats']),
  },
  methods: {
    ...mapActions(['getGlobalStats']),
  },
};
</script>
